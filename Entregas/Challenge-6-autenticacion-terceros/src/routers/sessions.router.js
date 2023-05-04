import { Router } from "express";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.post(
    "/register",
    passport.authenticate("register", { failureRedirect: "./failregister" }),
    async (req, res) => {
        return res.send({ status: "success", message: "user registered" });
    }
);

sessionRouter.get("/failregister", (req, res) => {
    res.status(400).send({ status: "error", error: "Register error" });
});

sessionRouter.post(
    "/login",
    passport.authenticate("login", { failureRedirect: "./faillogin" }),
    async (req, res) => {
        if (!req.user)
            return res
                .status(400)
                .send({ status: "error", error: "User not found" });

        req.session.user = req.user;
        res.send({
            status: "success",
            message: "Logged In",
            payload: req.session.user,
        });
    }
);

sessionRouter.get("/faillogin", (req, res) => {
    res.status(400).send({ status: "error", error: "Failed login" });
});

sessionRouter.get("/logout", (req, res) => {
    try {
        req.session.destroy();

        return res.send({
            status: "success",
            message: "logout completed",
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Logout error",
        });
    }
});

sessionRouter.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] }),
    async (req, res) => {}
);

sessionRouter.get(
    "/githubcallback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    async (req, res) => {
        req.session.user = req.user;
        console.log(req.user);
        res.redirect("/products");
    }
);

export default sessionRouter;
