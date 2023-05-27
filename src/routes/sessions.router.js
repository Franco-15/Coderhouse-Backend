import { Router } from "express";
import {
    current,
    faillogin,
    failregister,
    githubResponse,
    login,
    logout,
    register,
} from "../controllers/sessions.controller.js";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.post("/register",
    passport.authenticate("register", { failureRedirect: "./failregister" }),
    register
);

sessionRouter.get("/failregister", failregister);

sessionRouter.post("/login",
    passport.authenticate("login", { failureRedirect: "./faillogin" }),
    login
);

sessionRouter.get("/faillogin", faillogin);

sessionRouter.get("/logout", logout);

sessionRouter.get("/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

sessionRouter.get("/githubcallback",
    passport.authenticate("github", { failureRedirect: "./faillogin" }),
    githubResponse
);

sessionRouter.get("/current", current);

export default sessionRouter;
