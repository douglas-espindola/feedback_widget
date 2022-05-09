import nodemailer from 'nodemailer';
import { MailAdapter, sendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "da6f19bb9d1b1a",
    pass: "fa3b067ec94bfe"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: sendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Douglas Espindola <douglasbrito15@gmail.com>',
      subject,
      html: body,
    });
  };
}