import nodemailer from "nodemailer";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import usersService from "../services/users.service.js";
import { sendMail } from "./email.js";

const {
  email: { restore_pass_secret, restore_pass_token },
} = config;

export const sendRestoreEmail = async (req, res) => {
  const { email } = req.body;
  const user = await usersService.getUserByEmail(email);
  if (!user) {
    return res.send({ status: "error", message: "User not found" });
  }
  let token = jwt.sign({ email }, restore_pass_secret, {
    expiresIn: "1h",
  });

  res.cookie(restore_pass_token, token, { httpOnly: true });

  let result = await sendMail({
    to: email,
    subject: "Restauracion de contraseña",
    html: `
          <div>
            <h1>Ecommerce de Bebidas</h1>
            <p>Para restaurar tu contraseña, hace click en el siguiente link</p>
            <a href="http://localhost:8080/changePassword">
            <button>Restaurar Contraseña</button>
            </a>
          </div>
          `,
  });
  if (!result) {
    return res.send({ status: "error", message: "Error sending email" });
  }
  res.send({ status: "success", message: "Email sent" });
};
