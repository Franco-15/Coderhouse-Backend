import { Router } from "express";
import {
    viewCart,
    viewLogin,
    viewMain,
    viewProduct,
    viewProducts,
    viewRegister,
    viewCurrent,
    viewMessages,
    viewLogger,
    viewUser,
    viewChangePassword,
    viewForgotPassword,
    viewManageProducts,
    viewPayment,
    viewTicket
} from "../controllers/views.controller.js";
import passport from "passport";
import { authorization } from "../utils/utils.js";

const viewsRouter = Router();

viewsRouter.get(
    "/products",
    passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
    viewProducts
);

viewsRouter.get(
    "/cart/:cid",
    passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
    authorization(["user", "premium"]),
    viewCart
);

viewsRouter.get(
    "/product/:pid",
    passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
    viewProduct
);

viewsRouter.get("/login", viewLogin);

viewsRouter.get("/register", viewRegister);

viewsRouter.get("/", viewMain);

viewsRouter.get(
    "/current",
    passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
    viewCurrent
);

viewsRouter.get(
    "/messages",
    passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
    authorization(["user", "premium"]),
    viewMessages
);

viewsRouter.get("/loggerTest", viewLogger);

viewsRouter.get(
    "/user",
    passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
    viewUser
);

viewsRouter.get(
    "/manageProducts",
    passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
    authorization(["admin", "premium"]),
    viewManageProducts
);

viewsRouter.get(
    "/changePassword",
    passport.authenticate("restorePassword", { session: false, failureRedirect: "/forgotPass" }),
    viewChangePassword
);

viewsRouter.get(
    "/forgotPass",
    viewForgotPassword
);


viewsRouter.get(
    "/payment",
    passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
    authorization(["user", "premium"]),
    viewPayment
);

viewsRouter.get(
    "/ticket/:tid",
    passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
    authorization(["user", "premium"]),
    viewTicket
);

export default viewsRouter;
