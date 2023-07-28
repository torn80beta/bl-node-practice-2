const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'olaf_haroldson@meta.ua',
    pass: 'Pinoplast1',
  },
});

async function sendEmail({ userEmail, userName, userMessage }) {
  const output = `<h1 style="color: green">Привіт власник сайту!</h1>
    <p>Пише вам: ${userName}</p>
    <p>Його контактний email ${userEmail}</p>
    <p>Текст повідомлення: ${userMessage}</p>
    <p style="color: blue">Дякуємо!</p>`;
  const info = await transporter.sendMail({
    from: 'olaf_haroldson@meta.ua', // sender address
    to: 'hotspam80@gmail.com', // list of receivers
    subject: 'Website about space and planets', // Subject line
    text: userMessage, // plain text body
    html: output, // html body
  });

  console.log('Message sent: %s', info.messageId);
}

module.exports = sendEmail;
