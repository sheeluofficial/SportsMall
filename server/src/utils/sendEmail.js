const nodemailer = require("nodemailer");
require('dotenv').config({ path: './src/config/config.env' });
// options are pass as arg from userController
const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
        }
      });


    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message, 
    };

    await transporter.sendMail(mailOptions);

   
}
module.exports = sendEmail;