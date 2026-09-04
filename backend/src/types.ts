export interface SubscribeRequest {
    email: string;
}

export interface SubscribeResponse {
    success: boolean;
}

export interface ErrorResponse {
    error: string;
}

export interface PendingConfirmation {
    email: string;
    timestamp: number;
    expiresAt: number;
    reminderSent: boolean;
    reminderTimeout?: NodeJS.Timeout;
}

export interface SenderNetSubscriber {
    email: string;
    groups: string[];
}

export interface SenderSubscriberResponse {
    data: {
        id: string;
        email: string;
        subscriber_tags: Array<{
            id: string;
            title: string;
        }>;
    };
}

export interface EmailConfig {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export interface CampaignData {
    title: string;
    subject: string;
    preheader: string;
    content: string;
}

interface CampaignHtml {
    id: string;
    thumbnail_url: string;
    has_preview: boolean;
    html_content: string;
    html_body: string | null;
}

interface CampaignResponseData {
    id: string;
    subject: string;
    reply_to: string;
    language: string;
    recipient_count: number | null;
    from: string;
    schedule_time: string | null;
    last_action: string;
    sent_time: string | null;
    status: string;
    created: string;
    modified: string;
    title: string;
    domain_id: string;
    preheader: string;
    auto_followup_active: boolean;
    auto_followup_subject: string;
    auto_followup_delay: number;
    editor: string;
    opens: number;
    clicks: number;
    bounces_count: number;
    send_to_all: boolean | null;
    html: CampaignHtml;
    sent_count: number;
    campaign_groups: string[];
    segments: string[];
}

export interface CampaignResponse {
    success: boolean;
    message: string;
    data: CampaignResponseData;
}

export interface EnvConfig {
    NODE_ENV: string;
    PORT: number;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_SECURE: boolean;
    SMTP_USER: string;
    SMTP_PASS: string;
    SMTP_FROM: string;
    SENDER_API_KEY: string;
    SENDER_TEMP_GROUP_ID: string;
    SENDER_NEWSLETTER_GROUP_ID: string;
    APP_URL: string;
    FRONTEND_URL: string;
}