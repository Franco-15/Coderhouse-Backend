import { Router } from "express";
import { checkLogged, checkLogin } from "../middlewares/auth.js";
import { viewCart, viewLogin, viewMain, viewProduct, viewProducts, viewRegister } from "../controllers/views.controller.js";

const viewsRouter = Router();

viewsRouter.get("/products", checkLogin, viewProducts);

viewsRouter.get("/cart/:cid", checkLogin, viewCart);

viewsRouter.get("/product/:pid", checkLogin, viewProduct);

viewsRouter.get("/login", checkLogged, viewLogin);

viewsRouter.get("/register", checkLogged, viewRegister);

viewsRouter.get("/", checkLogin, viewMain);

export default viewsRouter;
