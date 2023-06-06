import cartsService from "../services/carts.service.js";

export async function getCartByID(req, res) {
    const cid = req.params.cid;
    try {
        const cartFromID = await cartsService.getCartByID(cid);
        res.status(200).send(cartFromID);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export async function createCart(req, res) {
    const cart = req.body;

    try {
        const cartCreated = await cartsService.createCart(cart);
        res.status(201).send({
            status: "success",
            message: "Cart created",
            payload: cartCreated
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export async function addProduct(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const productAdded = await cartsService.addProduct(cid, pid, quantity);
        res.status(201).send({
            status: "success",
            message: `Product id:${pid} added to cart id:${cid}`,
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export async function deleteProduct(req, res) {
    const { cid, pid } = req.params;

    try {
        const productDeleted = cartsService.deleteProduct(cid, pid);
        res.status(200).send({
            status: "success",
            message: `Product id:${pid} deleted from cart id:${cid}`,
            payload: productDeleted
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export async function deleteAllProducts(req, res) {
    const cid = req.params.cid;

    try {
        const productsDeleted = cartsService.deleteAllProducts(cid);
        res.status(200).send({
            status: "success",
            message: `Products deleted from cart id:${cid}`,
            payload: productsDeleted
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export async function updateProduct(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const productUpdated = cartsService.updateProduct(cid, pid, quantity);
        res.status(200).send({
            status: "success",
            message: `Product id:${pid} updated in cart id:${cid}`,
            payload: productUpdated
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export async function updateCart(req, res) {
    const cid = req.params.cid;
    const products = req.body;

    try {
        const cartUpdated = cartsService.updateCart(cid, products);
        res.status(200).send({
            status: "success",
            message: `Cart ${cid} updated`,
            payload: cartUpdated
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export async function purchase(req, res) {
    const cid = req.params.cid;
    const user = req.user;
    try {
        const completedPurchase = await cartsService.purchase({ cid, user });
        res.status(200).send({
            status: "success",
            message: `Purchase completed. Cart: ${cid}`,
            payload: completedPurchase
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}
