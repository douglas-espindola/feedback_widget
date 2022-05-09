import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "da6f19bb9d1b1a",
    pass: "fa3b067ec94bfe"
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Douglas Espindola <douglasbrito15@gmail.com>',
    subject: 'Novo feedback',
    html: [
      '<di style="font-family: sans-serif; font-size: 16px; color:#111;">',
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      '<di>'
    ].join('\n')
  });

  return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
  console.log('HTTP Server running!');
});
