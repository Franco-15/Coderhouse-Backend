import { Router } from "express";
import {
  faillogin,
  failregister,
  githubResponse,
  login,
  logout,
  register,
} from "../controllers/sessions.controller.js";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "./failregister",
  }),
  register
);

sessionRouter.get("/failregister", failregister);

sessionRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "./faillogin",
  }),
  login
);

sessionRouter.get("/faillogin", faillogin);

sessionRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logout
);

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

sessionRouter.get(
  "/githubcallback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "./faillogin",
  }),
  githubResponse
);

export default sessionRouter;
