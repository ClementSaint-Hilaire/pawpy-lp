import crypto from 'crypto';
import { PendingConfirmation } from '../types.js';
import { emailService } from './emailService.js';
import { config } from '../config.js';

class ConfirmationService {
    private pendingConfirmations = new Map<string, PendingConfirmation>();
    private readonly EXPIRATION_TIME = 12 * 60 * 60 * 1000;
    private readonly REMINDER_TIME = 12 * 60 * 60 * 1000;

    constructor() {
        // Cleanup expired confirmations every hour
        setInterval(() => this.cleanupExpired(), 60 * 60 * 1000);
    }

    generateToken(): string {
        return crypto.randomBytes(32).toString('hex');
    }

    addPendingConfirmation(token: string, email: string): void {
        const now = Date.now();

        // Schedule reminder email to be sent after 12 hours
        const reminderTimeout = setTimeout(async () => {
            const confirmation = this.pendingConfirmations.get(token);
            if (confirmation && !confirmation.reminderSent) {
                try {
                    const confirmUrl = `${config.FRONTEND_URL}/confirmation?email=${encodeURIComponent(email)}&token=${token}`;
                    await emailService.sendReminderEmail(email, confirmUrl);

                    // Mark reminder as sent
                    confirmation.reminderSent = true;
                    this.pendingConfirmations.set(token, confirmation);

                    console.log(`✉️  Reminder sent to ${email}`);
                } catch (error) {
                    console.error(`Failed to send reminder to ${email}:`, error);
                }
            }
        }, this.REMINDER_TIME);

        this.pendingConfirmations.set(token, {
            email,
            timestamp: now,
            expiresAt: now + this.EXPIRATION_TIME,
            reminderSent: false,
            reminderTimeout,
        });
    }

    getConfirmation(token: string): PendingConfirmation | undefined {
        return this.pendingConfirmations.get(token);
    }

    removeConfirmation(token: string): void {
        const confirmation = this.pendingConfirmations.get(token);

        // Clear reminder timeout if it exists
        if (confirmation?.reminderTimeout) {
            clearTimeout(confirmation.reminderTimeout);
        }

        this.pendingConfirmations.delete(token);
    }

    removeByEmail(email: string): void {
        for (const [token, confirmation] of this.pendingConfirmations.entries()) {
            if (confirmation.email === email) {
                if (confirmation.reminderTimeout) {
                    clearTimeout(confirmation.reminderTimeout);
                }
                this.pendingConfirmations.delete(token);
                console.log(`🗑️  Removed pending confirmation for ${email}`);
                break;
            }
        }
    }

    isExpired(confirmation: PendingConfirmation): boolean {
        return Date.now() > confirmation.expiresAt;
    }

    private cleanupExpired(): void {
        const now = Date.now();
        for (const [token, data] of this.pendingConfirmations.entries()) {
            if (now > data.expiresAt) {
                // Clear timeout before removing
                if (data.reminderTimeout) {
                    clearTimeout(data.reminderTimeout);
                }
                this.pendingConfirmations.delete(token);
                console.log(`🗑️  Cleaned up expired confirmation for ${data.email}`);
            }
        }
    }

    getPendingCount(): number {
        return this.pendingConfirmations.size;
    }
}

export const confirmationService = new ConfirmationService();