import { Router } from "express";
// import fs from "fs"
import ProductManager from "../dao/dbManagers/product.manager.js";
import CartManager from "../dao/dbManagers/cart.manager.js";
import { checkLogged, checkLogin } from "../middlewares/auth.js";

const viewsRouter = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

viewsRouter.get("/products", checkLogin, async (req, res) => {
    const { limit, page, sort, category, status } = req.query;
    const user = req.session.user;
    let infoRender = {};

    try {
        let products = await productManager.getProducts(
            limit,
            page,
            sort,
            category,
            status
        );

        infoRender = {
            products: products.payload,
            totalPages: products.totalPages,
            hasPrevPAge: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            limit: limit ? parseInt(limit) : 10,
            page: page ? parseInt(page) : 1,
            sort: sort ? parseInt(sort) : 1,
            category: category ? category : undefined,
            status: status ? status : undefined,
            user: user,
        };
    } catch (err) {
        console.log(err);
    }
    res.render("products", infoRender);
});

viewsRouter.get("/cart/:cid", checkLogin, async (req, res) => {
    const cid = req.params.cid;

    try {
        const cart = await cartManager.getCartByID(cid);

        if (cart) {
            res.render("cart", { cart });
        } else {
            res.status(404).send({
                status: "error",
                message: "Not found cart",
            });
        }
    } catch (error) {
        console.log({
            status: error.status,
            message: error.message,
        });
    }
});

viewsRouter.get("/product/:pid", checkLogin, async (req, res) => {
    const pid = req.params.pid;

    try {
        const product = await productManager.getProductByID(pid);

        if (product) {
            res.render("product", product);
        } else {
            res.status(404).send({
                status: "error",
                message: "Not found product",
            });
        }
    } catch (error) {
        console.log({
            status: error.status,
            message: error.message,
        });
    }
});

viewsRouter.get("/login", checkLogged, (req, res) => {
    res.render("login");
});

viewsRouter.get("/register", checkLogged, (req, res) => {
    res.render("register");
});

viewsRouter.get("/", checkLogin, (req, res) => {
    res.redirect("/login");
});

export default viewsRouter;
