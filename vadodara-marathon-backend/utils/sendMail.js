const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendMail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_USER || '"Vadodara Marathon" <noreply@vadodaramarathon.com>',
            to,
            subject,
            text,
            html,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
};

module.exports = sendMail;
