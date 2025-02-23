const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io', 
  port: 587, 
  auth: {
    user: 'd8c6efbbae7a9e', 
    pass: '586382f307d151', 
  },
});


async function sendEmail(to, subject, html) {
  const mailOptions = {
    from: 'final_buf@bk.ru', 
    to,
    subject,
    html,
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

// // Пример отправки письма
// const mailOptions = {
//   from: 'your_email@example.com',
//   to: 'recipient_email@example.com', // Почта получателя
//   subject: 'Подтверждение регистрации',
//   text: 'Ваш код подтверждения: 123456',
// };

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log('Ошибка отправки:', error);
//   } else {
//     console.log('Письмо отправлено:', info.response);
//   }
// });
