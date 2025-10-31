import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});
 const sendVerificationEmail=async(user,token) => {
    const verifyUrl= `${process.env.BASE_URL}/api/auth/verify-email?token=${token}`;
    const mailOptions ={
        from: `SaveIt <${process.env.USER_EMAIL}>`,
        to: user.email,
        subject: "Verify Your Email",
        html:`
       <h2>Welcome to SaveIt Management System!</h2>
      <p>Click below to verify your email:</p>
      <a href="${verifyUrl}">Verify Email</a>
      <br/><br/>
      <p>This link expires in 1 hour.</p>
        `,
    };
    await transporter.sendMail(mailOptions);
console.log("Email:", process.env.USER_EMAIL);
console.log("Password:", process.env.USER_PASS ? "Loaded" : "Missing");

}
export default sendVerificationEmail;