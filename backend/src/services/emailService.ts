import nodemailer, { Transporter } from 'nodemailer';
import { config } from '../config.js';
import { EmailConfig } from '../types.js';

class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.SMTP_HOST,
            port: config.SMTP_PORT,
            secure: config.SMTP_SECURE,
            auth: {
                user: config.SMTP_USER,
                pass: config.SMTP_PASS,
            },
        });
    }

    async sendConfirmationEmail(email: string, confirmUrl: string): Promise<void> {
        const emailConfig: EmailConfig = {
            from: `"Pawpy" <${config.SMTP_FROM}>`,
            to: email,
            subject: 'Confirmez votre inscription à la newsletter Pawpy',
            html: this.getConfirmationEmailTemplate(confirmUrl, email),
        };

        await this.transporter.sendMail(emailConfig);
        console.log(`✉️  Confirmation email sent to ${email}`);
    }

    async sendReminderEmail(email: string, confirmUrl: string): Promise<void> {
        const emailConfig: EmailConfig = {
            from: `"Pawpy" <${config.SMTP_FROM}>`,
            to: email,
            subject: 'Rappel : Confirmez votre inscription à la newsletter Pawpy',
            html: this.getReminderEmailTemplate(confirmUrl, email),
        };

        await this.transporter.sendMail(emailConfig);
        console.log(`✉️  Reminder email sent to ${email}`);
    }

    private getConfirmationEmailTemplate(confirmUrl: string, email: string): string {
        return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
          }
          .header {
            background-color: #1a1a1a;
            padding: 40px;
            text-align: center;
          }
          .logo {
            color: white;
            font-size: 28px;
            font-weight: bold;
            margin: 0;
          }
          .content {
            padding: 40px;
          }
          h1 {
            font-size: 24px;
            color: #1a1a1a;
            margin: 0 0 20px;
          }
          p {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
            margin: 0 0 20px;
          }
          .button {
            display: inline-block;
            padding: 16px 40px;
            background-color: #1a1a1a;
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">Pawpy</h1>
          </div>
          <div class="content">
            <h1>Confirmez votre inscription à notre newsletter</h1>
            <p>Bonjour,</p>
            <p>Merci de vous être inscrit à notre newsletter ! Pour finaliser votre inscription, veuillez cliquer sur le bouton ci-dessous :</p>
            <div style="text-align: center;">
              <a href="${confirmUrl}" class="button">Confirmer mon inscription</a>
            </div>
            <p>Si vous n'avez pas demandé cette inscription, ignorez simplement cet email.</p>
            
            <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e5e5; text-align: center; font-size: 13px; color: #999;">
              <p style="margin: 5px 0;"><strong>Pawpy</strong></p>
              <p style="margin: 5px 0;">40 rue du Chemin Vert, 75011 Paris, France</p>
              <p style="margin: 15px 0 0;">© 2026 Pawpy. Tous droits réservés.</p>
              <p style="margin: 10px 0 0;">
                <a href="${config.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #666; text-decoration: underline;">
                  Se désinscrire
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    }

    private getReminderEmailTemplate(confirmUrl: string, email: string): string {
        return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f4f4f4;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
          }
          .header {
            background-color: #1a1a1a;
            padding: 40px 20px;
            text-align: center;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
            margin: 0;
          }
          .content {
            padding: 40px 30px;
            color: #333333;
          }
          .content h1 {
            font-size: 24px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 20px 0;
          }
          .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #555555;
            margin: 0 0 20px 0;
          }
          .button-container {
            text-align: center;
            margin: 30px 0;
          }
          .confirm-button {
            display: inline-block;
            padding: 16px 40px;
            background-color: #1a1a1a;
            color: #ffffff;
            text-decoration: none;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1 class="logo">Pawpy</h1>
          </div>
          <div class="content">
            <h1>Rappel : Confirmez votre inscription</h1>
            <p>Bonjour,</p>
            <p>Nous vous rappelons que vous avez souscrit à notre newsletter.</p>
            <p>Pour finaliser votre inscription, veuillez cliquer sur le bouton ci-dessous :</p>
            <div class="button-container">
              <a href="${confirmUrl}" class="confirm-button">
                Confirmer mon inscription
              </a>
            </div>
            <p>Si vous ne répondez pas d'ici 12h, votre inscription sera automatiquement annulée.</p>
            <p>Si vous n'avez pas demandé cette inscription, ignorez simplement cet email.</p>
            
            <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e5e5; text-align: center; font-size: 13px; color: #999;">
              <p style="margin: 5px 0;"><strong>Pawpy</strong></p>
              <p style="margin: 5px 0;">40 rue du Chemin Vert, 75011 Paris, France</p>
              <p style="margin: 15px 0 0;">© 2026 Pawpy. Tous droits réservés.</p>
              <p style="margin: 10px 0 0;">
                <a href="${config.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #666; text-decoration: underline;">
                  Se désinscrire
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    }

    async verifyConnection(): Promise<boolean> {
        try {
            await this.transporter.verify();
            return true;
        } catch (error) {
            console.error('SMTP connection error:', error);
            return false;
        }
    }
}

export const emailService = new EmailService();