import { SMTPClient } from 'emailjs';
import fs from 'fs';

abstract class MailerAbstract {

    abstract sendMail(to: string, subject: string, html: string, text: string): Promise<any>;

}

export class Mailer extends MailerAbstract {

    USER = '';
    PASSWORD = '';
    HOST = '';

    constructor() {
        super();
        const settingsFile = fs.readFileSync('settings.conf', { encoding: 'utf-8'});
        const settings = JSON.parse(settingsFile);
        this.USER = settings.email_user;
        this.PASSWORD = settings.email_password;
        this.HOST = settings.email_host;

    }

    async sendMail(to: string, subject: string, html: string, text: string) {

        const client = new SMTPClient({
            user: this.USER,
            password: this.PASSWORD,
            host: this.HOST,
            tls: true,
        });

        const message = {
            text: text,
            from: 'Test evaluativo <no-reply@test-eval.com.co>',
            to,
            subject,
            attachment: [
                { data: html, alternative: true },
            ],
        };

        return new Promise( (resolve, reject) => {
            // @ts-ignore
            client.send(message, function (err, message) {
                console.log(err || message);
                if (err) {
                    reject(err)
                } else {
                    resolve(message);
                }
            });
        })

    }

}
