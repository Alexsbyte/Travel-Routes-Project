const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // host: "smtp.mail.ru",
  // port: 465,
  // secure: true,

  service: 'Mail.ru',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, subject, text, html) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error occurred:', error);
    return false;
  }
}

module.exports = sendEmail;
