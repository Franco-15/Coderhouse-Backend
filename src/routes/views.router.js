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
} from "../controllers/views.controller.js";
import passport from "passport";
import { authorization } from "../utils/utils.js";

const viewsRouter = Router();

viewsRouter.get(
    "/products",
    passport.authenticate("jwt", { session: false }),
    viewProducts
);

viewsRouter.get(
    "/cart/:cid",
    passport.authenticate("jwt", { session: false }),
    authorization("user"),
    viewCart
);

viewsRouter.get(
    "/product/:pid",
    passport.authenticate("jwt", { session: false }),
    viewProduct
);

viewsRouter.get("/login", viewLogin);

viewsRouter.get("/register", viewRegister);

viewsRouter.get("/", viewMain);

viewsRouter.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    viewCurrent
);

viewsRouter.get(
    "/messages",
    passport.authenticate("jwt", { session: false }),
    authorization("user"),
    viewMessages
);

viewsRouter.get("/loggerTest", viewLogger);

viewsRouter.get(
    "/user",
    passport.authenticate("jwt", { session: false }),
    viewUser
);

export default viewsRouter;
