import Exception from "../exceptions.js";
import { cartsRepository } from "../repositories/index.js";
import productsService from "./products.service.js";

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
            const productAded = await cartsRepository.addProduct(cid, pid, quantity);
            productsService.updateProduct(pid, { quantity: quantity})
            return productAded;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(cid, pid) {
        try {
            const productDeleted = await cartsRepository.deleteProduct(cid, pid);
            return productDeleted;
        } catch (error) {
            throw error;
        }
    }

    async deleteAllProducts(cid) {
        try {
            const productsDeleted = await cartsRepository.deleteAllProducts(cid);
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
}

export default new CartsService();
