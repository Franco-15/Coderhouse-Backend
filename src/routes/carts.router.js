import { Router } from "express";
import {
    addProduct,
    createCart,
    deleteAllProducts,
    deleteProduct,
    getCartByID,
    updateCart,
    updateProduct,
    purchase,
} from "../controllers/carts.controller.js";
import passport from "passport";

//Create Router instance
const cartsRouter = Router();

cartsRouter.get("/:cid", getCartByID);

cartsRouter.post("/", createCart);

cartsRouter.post("/:cid/product/:pid", addProduct);

cartsRouter.delete("/:cid/product/:pid", deleteProduct);

cartsRouter.delete("/:cid", deleteAllProducts);

cartsRouter.put("/:cid/product/:pid", updateProduct);

cartsRouter.put("/:cid", updateCart);

cartsRouter.get("/:cid/purchase", passport.authenticate("jwt", { session: false} ), purchase);

export default cartsRouter;
