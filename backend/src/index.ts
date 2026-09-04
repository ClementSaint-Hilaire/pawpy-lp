import express, { Request, Response } from 'express';
import cors from 'cors';
import { confirmationService } from './services/confirmationService.js';
import { emailService } from './services/emailService.js';
import { senderNetService } from './services/senderService.js';
import { config } from './config.js';

const app = express();

// CORS configuration
const corsOptions = {
    origin: config.NODE_ENV === 'production'
        ? [config.FRONTEND_URL]
        : ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Validation helper
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Subscribe endpoint
app.post('/api/subscribe', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            res.status(400).json({ error: 'Email is required' });
            return;
        }

        if (!isValidEmail(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        // Generate confirmation token
        const token = confirmationService.generateToken();
        const confirmUrl = `${config.FRONTEND_URL}/confirmation?email=${encodeURIComponent(email)}&token=${token}`;

        // Store pending confirmation
        confirmationService.addPendingConfirmation(token, email);

        // Send confirmation email via nodemailer
        await emailService.sendConfirmationEmail(email, confirmUrl);

        // Add to Sender.net temporary group
        await senderNetService.addToTempGroup(email);

        res.json({ success: true });
    } catch (error) {
        console.error('Subscribe error:', error);
        res.status(500).json({ error: 'Subscription failed' });
    }
});

// Confirm endpoint
app.get('/api/confirm', async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.query;

        if (!token || typeof token !== 'string') {
            res.status(400).json({ error: 'Invalid confirmation link' });
            return;
        }

        const confirmation = confirmationService.getConfirmation(token);

        if (!confirmation) {
            res.status(400).json({ error: 'Invalid or expired confirmation link' });
            return;
        }

        // Check if expired
        if (confirmationService.isExpired(confirmation)) {
            confirmationService.removeConfirmation(token);
            res.status(400).json({ error: 'Confirmation link has expired' });
            return;
        }

        // Move subscriber to Newsletter group in Sender.net
        await senderNetService.moveToNewsletterGroup(confirmation.email);

        // Remove from pending confirmations
        confirmationService.removeConfirmation(token);

        res.json({ success: true, email: confirmation.email });
    } catch (error) {
        console.error('Confirm error:', error);
        res.status(500).json({ error: 'Confirmation failed' });
    }
});

// Get subscriber endpoint
app.get('/api/subscriber', async (req: Request, res: Response) => {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
        res.status(400).json({ error: 'Email query parameter is required' });
        return;
    }

    try {
        const subscriber = await senderNetService.getSubscriberData(email);
        if (subscriber) {
            res.json(subscriber);
        } else {
            res.status(404).json({ error: 'Subscriber not found' });
        }
    } catch (error) {
        console.error('Error fetching subscriber data:', error);
        res.status(500).json({ error: 'Failed to fetch subscriber data' });
    }
});

// Unsubscribe endpoint
app.post('/api/unsubscribe', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.query;

        if (!email || typeof email !== 'string') {
            res.status(400).json({ error: 'Email required' });
            return;
        }

        if (!isValidEmail(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        try {
            // Get subscriber to check which group they're in
            const getResponse = await fetch(
                `https://api.sender.net/v2/subscribers/${encodeURIComponent(email)}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${config.SENDER_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (getResponse.ok) {
                const subscriberData = await getResponse.json() as {
                    data: {
                        id: string;
                        subscriber_tags: Array<{ id: string; title: string }>;
                    }
                };

                const subscriberId = subscriberData.data.id;
                const tags = subscriberData.data.subscriber_tags;

                // Check which group they're in
                const isInTempGroup = tags.some(tag => tag.id === config.SENDER_TEMP_GROUP_ID);
                const isInNewsletterGroup = tags.some(tag => tag.id === config.SENDER_NEWSLETTER_GROUP_ID);

                console.log(`Unsubscribing ${email} - Temp: ${isInTempGroup}, Newsletter: ${isInNewsletterGroup}`);

                // Remove from the appropriate group(s)
                if (isInTempGroup) {
                    await fetch(
                        `https://api.sender.net/v2/subscribers/groups/${config.SENDER_TEMP_GROUP_ID}`,
                        {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${config.SENDER_API_KEY}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                subscribers: [email]
                            }),
                        }
                    );
                    console.log(`✅ Removed from Temp group: ${email}`);
                }

                if (isInNewsletterGroup) {
                    await fetch(
                        `https://api.sender.net/v2/subscribers/groups/${config.SENDER_NEWSLETTER_GROUP_ID}`,
                        {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${config.SENDER_API_KEY}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                subscribers: [email]
                            }),
                        }
                    );
                    console.log(`✅ Removed from Newsletter group: ${email}`);
                }

                // Delete the subscriber entirely after removing from groups
                await fetch('https://api.sender.net/v2/subscribers', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${config.SENDER_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        subscribers: [subscriberId]
                    }),
                });

                console.log(`✅ Deleted subscriber: ${email}`);
            }
        } catch (err) {
            console.log('Subscriber not found or already unsubscribed:', email);
        }

        // Also remove from pending confirmations if they exist
        confirmationService.removeByEmail(email);

        res.json({ success: true });
    } catch (error) {
        console.error('Unsubscribe error:', error);
        res.status(500).json({ error: 'Failed to unsubscribe' });
    }
});

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
    console.log(`CORS enabled for: ${corsOptions.origin}`);
});