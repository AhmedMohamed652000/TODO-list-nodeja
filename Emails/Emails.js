import nodemailer from "nodemailer";
import { emailTemplate } from "./ConfirmEmailTemplate.js";
import jwt from "jsonwebtoken";

const sendEmail = async ({ email }) => {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ahmedghames22@gmail.com",
      pass: "xauvlfeawntjcgqo",
    },
  });
  let token = jwt.sign({ email }, process.env.EmailKey);
  let info = await transporter.sendMail({
    from: "ahmedghames22@gmail",
    to: email,
    subject: "welcome 😀",
    html: emailTemplate(token),
  });
};

export { sendEmail };
