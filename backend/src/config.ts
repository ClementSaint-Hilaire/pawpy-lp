import dotenv from 'dotenv';
import { EnvConfig } from './types.js';

dotenv.config();

function getEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

function getEnvVarAsNumber(key: string): number {
    const value = getEnvVar(key);
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
        throw new Error(`Environment variable ${key} must be a number`);
    }
    return parsed;
}

function getEnvVarAsBoolean(key: string): boolean {
    const value = getEnvVar(key);
    return value === 'true';
}

export const config: EnvConfig = {
    PORT: getEnvVarAsNumber('PORT'),
    NODE_ENV: getEnvVar('NODE_ENV'),
    SMTP_HOST: getEnvVar('SMTP_HOST'),
    SMTP_PORT: getEnvVarAsNumber('SMTP_PORT'),
    SMTP_SECURE: getEnvVarAsBoolean('SMTP_SECURE'),
    SMTP_USER: getEnvVar('SMTP_USER'),
    SMTP_PASS: getEnvVar('SMTP_PASS'),
    SMTP_FROM: getEnvVar('SMTP_FROM'),
    SENDER_API_KEY: getEnvVar('SENDER_API_KEY'),
    SENDER_TEMP_GROUP_ID: getEnvVar('SENDER_TEMP_GROUP_ID'),
    SENDER_NEWSLETTER_GROUP_ID: getEnvVar('SENDER_NEWSLETTER_GROUP_ID'),
    APP_URL: getEnvVar('APP_URL'),
    FRONTEND_URL: getEnvVar('FRONTEND_URL'),
};