import { Router } from "express";
// import CartManager from "../dao/filesManager/cart.manager.js"
import CartManager from "../dao/dbManagers/cart.manager.js";

//Create File Product Manager instance
// const CART_PATH = "./src/files/carts.json";
// const cmanager = new CartManager(CART_PATH);

//Create DB Product Manager instance
const cmanager = new CartManager();

//Create Router instance
const cartsRouter = Router();

cartsRouter.get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    try {
        const cartFromID = await cmanager.getCartByID(cid);
        res.status(200).send(cartFromID);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

cartsRouter.post("/", async (req, res) => {
    const cart = req.body;

    if (!cart) {
        res.status(400).send({
            status: "error",
            message: "Not could create cart",
        });
    }

    try {
        await cmanager.createCart(cart);
        res.status(201).send({
            status: "success",
            message: "Cart created",
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        await cmanager.addProduct(cid, pid, quantity);
        res.status(201).send({
            status: "success",
            message: `Product id:${pid} added to cart id:${cid}`,
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try{
        await cmanager.deleteProduct(cid, pid);
        res.status(200).send({
            status: "success",
            message: `Product id:${pid} deleted from cart id:${cid}`,
        });
    }
    catch (error) {
        res.status(error.status).send(error.message);
    }
})

cartsRouter.delete("/:cid", async(req,res) => {
    const cid = req.params.cid;

    try{
        await cmanager.deleteProducts(cid);
        res.status(200).send({
            status: "success",
            message: `Products deleted from cart id:${cid}`,
        });
    }
    catch (error) {
        res.status(error.status).send(error.message);
    }
})

cartsRouter.put("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        await cmanager.updateProduct(cid, pid, quantity);
        res.status(200).send({
            status: "success",
            message: `Product id:${pid} updated in cart id:${cid}`,
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

cartsRouter.put("/:cid", async(req,res) =>{
    const cid = req.params.cid
    const products = req.body

    console.log(products)

    try{
        await cmanager.updateCart(cid, products)
        res.status(200).send({
            status: "success",
            message: `Cart ${cid} updated`,
        });

    }catch(error){
        res.status(error.status).send(error.message)
    }
})

export default cartsRouter;
