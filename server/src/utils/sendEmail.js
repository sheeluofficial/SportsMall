const nodemailer = require('nodemailer');
const ErrorHandler = require('./errorhandler');

require('dotenv').config({ path: './src/config/config.env' });

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  }
});


// Send reset email
const sendEmail = async ({ email, message,res, next }) => {  // Added 'res' parameter
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'Password Reset',
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reset email sent successfully');
   return res.status(200).json({ message: 'Reset email sent successfully' });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Failed to send reset email', 500));
  }
};

module.exports = sendEmail;
