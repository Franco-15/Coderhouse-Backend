import Exception from "../exceptions.js";
import { cartsRepository } from "../repositories/index.js";
import productsService from "./products.service.js";
import ticketsService from "./tickets.service.js";

class CartsService {
    constructor() {}

    async getCartByID(cid) {
        try {
            const cartFromID = await cartsRepository.getCartByID(cid);
            return cartFromID;
        } catch (error) {
            throw error;
        }
    }

    async createCart(cart) {
        if (!cart) throw new Exception(400, "Cart params not found");

        try {
            const cartCreated = await cartsRepository.createCart(cart);
            return cartCreated;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(cid, pid, quantity) {
        try {
            const productAded = await cartsRepository.addProduct(
                cid,
                pid,
                quantity
            );
            return productAded;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(cid, pid) {
        try {
            const productDeleted = await cartsRepository.deleteProduct(
                cid,
                pid
            );
            return productDeleted;
        } catch (error) {
            throw error;
        }
    }

    async deleteAllProducts(cid) {
        try {
            const productsDeleted = await cartsRepository.deleteAllProducts(
                cid
            );
            return productsDeleted;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(cid, pid, quantity) {
        try {
            const productUpdated = await cartsRepository.updateProduct(
                cid,
                pid,
                quantity
            );
            return productUpdated;
        } catch (error) {
            throw error;
        }
    }

    async updateCart(cid, cart) {
        try {
            const cartUpdated = await cartsRepository.updateCart(cid, cart);
            return cartUpdated;
        } catch (error) {
            throw error;
        }
    }

    async purchase({ cid, user }) {
        try {
            const cart = await this.getCartByID(cid);
            const getProducts = await productsService.getProducts();
            const dbProducts = getProducts.payload;
            const cartProducts = cart.products;
            let productsWithouStock = [];

            if (cartProducts.length === 0)
                throw new Exception(400, {
                    status: "error",
                    message: "Purchase not completed. Cart is empty",
                });
            cartProducts.forEach(async (cartProduct) => {
                let dbProduct = dbProducts.find(
                    (product) =>
                        product._id.toString() ===
                        cartProduct.product._id.toString()
                );
                if (dbProduct.stock < cartProduct.quantity)
                    productsWithouStock.push(
                        cartProduct.product._id.toString()
                    );
            });
            if (productsWithouStock.length > 0) {
                let newProductsCart = cartProducts.filter(
                    (cartProduct) =>
                        !productsWithouStock.includes(
                            cartProduct.product._id.toString()
                        )
                );

                const cartUpdated = await cartsRepository.updateCart(
                    cid,
                    newProductsCart
                );
                throw new Exception(400, {
                    status: "error",
                    message:
                        "Purchase not completed .There are products without stock",
                    payload: productsWithouStock,
                });
            } else {
                cartProducts.forEach(async (cartProduct) => {
                    let dbProduct = dbProducts.find(
                        (product) =>
                            product._id.toString() ===
                            cartProduct.product._id.toString()
                    );
                    await productsService.updateProduct(dbProduct.id, {
                        quantity: cartProduct.quantity * -1,
                    });
                });

                const ticketData = {
                    cart: cart,
                    user: user,
                };

                const newTicket = await ticketsService.createTicket(ticketData);
                await cartsRepository.deleteAllProducts(cid);

                return newTicket;
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new CartsService();
