import { Router } from "express";
// import ProductManager from "../classes/ProductManager.js";
import ProductManager from "../dao/dbManagers/product.manager.js";
import { uploader } from "../utils.js";

//Create Product Manager File instance
// const PATH = "./src/files/products.json";
// const pmanager = new ProductManager(PATH);

//Create Product Manager DB instance
const pmanager = new ProductManager();

//Create Router instance
const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
    const { limit, page, sort, category, status } = req.query;

    try {
        const products = await pmanager.getProducts(
            limit,
            page,
            sort,
            category,
            status
        );
        res.status(200).send({
            status: "success",
            ...products,
        });
    } catch (error) {
        res.status(404).send({
            status: error.status,
            message: error.message,
        });
    }
});

productsRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const product = await pmanager.getProductByID(id);
        console.log(product);
        if (product) {
            res.status(200).send({
                status: "success",
                product: product,
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "Not found product",
            });
        }
    } catch (error) {
        res.status(404).send({
            status: error.status,
            message: error.message,
        });
    }
});

productsRouter.post("/", async (req, res) => {
    // const { title, description, code, price, stock, category } = req.body;
    const product = req.body;

    product.stock > 0 ? (product.status = true) : (product.status = false);

    try {
        await pmanager.addProduct(product);
        res.status(201).send({
            status: "success",
            message: "Product created successfully",
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

productsRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const productUpdated = req.body;

    try {
        await pmanager.updateProduct(id, productUpdated);
        res.status(200).send({
            status: "success",
            message: "Product updated succesfully",
        });
        const products = await pmanager.getProducts();
        // io.emit("render", products);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
});

productsRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const productDeleted = await pmanager.deleteProduct(id);
        if (productDeleted.deletedCount === 0) {
            res.status(404).send({
                status: "error",
                message: "Not found product to delete",
            });
        } else {
            res.status(200).send({
                status: "success",
                message: "Product removed succesfully",
            });
        }
    } catch (err) {
        res.status(err.status).send(err.message);
    }
});

export default productsRouter;
