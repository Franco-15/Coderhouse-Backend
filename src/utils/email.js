import nodemailer from "nodemailer";
import config from "../config/config.js";

const {
    email: { service, port, user, pass },
} = config;
const transport = nodemailer.createTransport({
    service: service,
    port: port,
    auth: {
        user: user,
        pass: pass,
    },
});

export const sendMail = async (emailFields) => {
    const { to, subject, html } = emailFields;
    let result = transport.sendMail({
        user,
        to,
        subject,
        html,
    });
    if (!result) {
        return { status: "error", message: "Error sending email" };
    }
    return { status: "success", message: "Email sent" };
};
