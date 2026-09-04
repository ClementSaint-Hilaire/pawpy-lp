import { config } from '../config.js';

interface SenderSubscriberResponse {
    data: {
        id: string;
        email: string;
        subscriber_tags: Array<{
            id: string;
            title: string;
        }>;
    };
}

class SenderService {
    private baseUrl = 'https://api.sender.net/v2';
    private headers = {
        'Authorization': `Bearer ${config.SENDER_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    async addToTempGroup(email: string, reactivate: boolean = true): Promise<void> {
        const data: any = {
            email,
            groups: [config.SENDER_TEMP_GROUP_ID],
        };

        // Always try to reactivate in case they were previously unsubscribed
        if (reactivate) {
            data.subscriber_status = 'ACTIVE';
        }

        const response = await fetch(`${this.baseUrl}/subscribers`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to add subscriber: ${error}`);
        }
    }

    async moveToNewsletterGroup(email: string): Promise<void> {
        try {
            // Get subscriber ID and current groups
            const getResponse = await fetch(
                `${this.baseUrl}/subscribers/${encodeURIComponent(email)}`,
                { method: 'GET', headers: this.headers }
            );

            if (!getResponse.ok) {
                throw new Error('Subscriber not found');
            }

            const subscriberData = await getResponse.json() as SenderSubscriberResponse;
            const subscriberId = subscriberData.data.id;

            console.log('Subscriber ID:', subscriberId);

            // Remove from "New subscriber" group
            const removeResponse = await fetch(
                `${this.baseUrl}/subscribers/groups/${config.SENDER_TEMP_GROUP_ID}`,
                {
                    method: 'DELETE',
                    headers: this.headers,
                    body: JSON.stringify({
                        subscribers: [email]
                    }),
                }
            );

            if (!removeResponse.ok) {
                const error = await removeResponse.text();
                console.warn('Failed to remove from New subscriber group:', error);
            } else {
                console.log(`✅ Removed from New subscriber group`);
            }

            // Add to Newsletter group AND reactivate if unsubscribed
            const patchResponse = await fetch(
                `${this.baseUrl}/subscribers/${subscriberId}`,
                {
                    method: 'PATCH',
                    headers: this.headers,
                    body: JSON.stringify({
                        groups: [config.SENDER_NEWSLETTER_GROUP_ID],
                        subscriber_status: 'ACTIVE'  // Reactivate if they were unsubscribed
                    }),
                }
            );

            if (!patchResponse.ok) {
                const error = await patchResponse.text();
                throw new Error(`Failed to add to Newsletter: ${error}`);
            }

            console.log(`✅ Moved ${email} to Newsletter group`);
        } catch (error) {
            console.error('Error moving subscriber:', error);
            throw error;
        }
    }

    async getSubscriberData(email: string): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/subscribers/${encodeURIComponent(email)}`,
            {
                method: 'GET',
                headers: this.headers,
            }
        );

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Failed to get subscriber: ${error}`);
        }

        const data = await response.json() as SenderSubscriberResponse;
        return data.data; // Return just the data object
    }
}

export const senderNetService = new SenderService();