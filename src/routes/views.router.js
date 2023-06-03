import { Router } from "express";
import { viewCart, viewLogin, viewMain, viewProduct, viewProducts, viewRegister, viewCurrent } from "../controllers/views.controller.js";
import passport from "passport";

const viewsRouter = Router();

viewsRouter.get("/products", passport.authenticate("jwt", { session: false} ), viewProducts);

viewsRouter.get("/cart/:cid", viewCart);

viewsRouter.get("/product/:pid", passport.authenticate("jwt", { session: false }), viewProduct);

viewsRouter.get("/login", viewLogin);

viewsRouter.get("/register", viewRegister);

viewsRouter.get("/", viewMain);

viewsRouter.get("/current", passport.authenticate("jwt", { session: false }), viewCurrent);

export default viewsRouter;
