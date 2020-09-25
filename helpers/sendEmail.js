'use strict';
const nodemailer = require('nodemailer');

async function sendVerificationEmail(verificationCode, to, subject) {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'engr.ahsan.bilal@gmail.com',
        pass: '12345678899',
      },
    });

    let info = await transporter.sendMail({
      from: 'engr.ahsan.bilal@gmail.com', // sender address
      to, // list of receivers
      subject, // Subject line
      text: '', // plain text body
      html: `Your verification Code is <b>${verificationCode}</b>`, // html body
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (e) {
    console.log(
      `Unable to send SMTP verification email at ${to}, Verification Code is `,
      verificationCode
    );
  }
}

module.exports = {
  sendVerificationEmail,
};
