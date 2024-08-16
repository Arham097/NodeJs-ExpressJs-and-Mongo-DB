const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  // 2. Define the email options
  const emailOption = {
    from: 'Admin support<arhamhasan70@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  }
  await transporter.sendMail(emailOption);


}

module.exports = sendEmail;