import { Router } from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.controller.js";
import { authorization } from "../utils.js";
import passport from "passport";

//Create Router instance
const productsRouter = Router();

productsRouter.get("/", getProducts);

productsRouter.get("/:id", getProductById);

productsRouter.post("/", passport.authenticate("jwt", { session: false }), authorization('admin'),addProduct);

productsRouter.put("/:id", passport.authenticate("jwt", { session: false }), authorization('admin'), updateProduct);

productsRouter.delete("/:id", passport.authenticate("jwt", { session: false }), authorization('admin'),deleteProduct);

export default productsRouter;
