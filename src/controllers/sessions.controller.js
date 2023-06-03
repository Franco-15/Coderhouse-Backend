import config from "../config/config.js";
import jwt from "jsonwebtoken";

//===== REGISTER =====
export async function register(req, res) {
    return res.send({ status: "success", message: "user registered" });
}

export async function failregister(req, res) {
    return res.status(400).send({ status: "error", error: "Register error" });
}

//===== LOGIN =====
export async function login(req, res) {
    if (!req.user)
        return res
            .status(400)
            .send({ status: "error", error: "User not logged" });

    let user = req.user;
    user.password = undefined;

    let token = jwt.sign({user}, config.jwtSecret, {
        expiresIn: "24h",
    });

    res.cookie(config.jwtCookieName, token, { httpOnly: true });

    res.send({
        status: "success",
        message: "Logged In",
        payload: user,
    });
}

export async function faillogin(req, res) {
    return res.status(400).send({ status: "error", error: "Login error" });
}

//===== LOGOUT =====
export async function logout(req, res) {
    try {
        return res.clearCookie(config.jwtCookieName).send({
            status: "success",
            message: "logout completed",
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Logout error",
        });
    }
}

//===== GITHUB =====

export async function githubResponse(req, res) {
    let token = jwt.sign({user}, config.jwtSecret, {
        expiresIn: "24h",
    });

    res.cookie(config.jwtCookieName, token, { httpOnly: true });
    res.redirect("/products");
}
