import { Router } from "express";
import {
    addProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../controllers/products.controller.js";
import { authorization } from "../utils/utils.js";
import passport from "passport";

//Create Router instance
const productsRouter = Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:id", getProductById);

productsRouter.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    authorization(["admin","premium"]),
    addProduct
);

productsRouter.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    updateProduct
);

productsRouter.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    authorization(["admin","premium"]),
    deleteProduct
);

export default productsRouter;
