import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html, bcc }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Amma-ma Foods" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      bcc,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent:", info.response);
  } catch (error) {
    console.error("❌ Email error:", error.message);
    throw error;
  }
};

export default sendEmail;
