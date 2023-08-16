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
import { authorization } from "../utils/utils.js";
import passport from "passport";

//Create Router instance
const cartsRouter = Router();

cartsRouter.get("/:cid", passport.authenticate("jwt", { session: false} ), authorization(["user","premium"]),getCartByID);

cartsRouter.post("/", passport.authenticate("jwt", { session: false} ), authorization(["user","premium"]),createCart);

cartsRouter.post("/:cid/product/:pid", passport.authenticate("jwt", { session: false} ), authorization(["user","premium"]),addProduct);

cartsRouter.delete("/:cid/product/:pid", passport.authenticate("jwt", { session: false} ),  authorization(["user","premium"]),deleteProduct);

cartsRouter.delete("/:cid", passport.authenticate("jwt", { session: false} ), authorization(["user","premium"]),deleteAllProducts);

cartsRouter.put("/:cid/product/:pid", passport.authenticate("jwt", { session: false} ),  authorization(["user","premium"]),updateProduct);

cartsRouter.put("/:cid", passport.authenticate("jwt", { session: false} ), authorization(["user","premium"]), updateCart);

cartsRouter.get("/:cid/purchase", passport.authenticate("jwt", { session: false} ), authorization(["user","premium"]), purchase);

export default cartsRouter;
