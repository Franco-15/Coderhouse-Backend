import CartsManager from "../dao/mongo/cart.manager.js";

class CartsRepository {
    constructor() {
        this.cmanager = new CartsManager();
    }

    async getCartByID(cid) {
        try {
            return await this.cmanager.getCartByID(cid);
        } catch (error) {
            throw error;
        }
    }

    async createCart(cart) {
        try {
            return await this.cmanager.createCart(cart);
        } catch (error) {
            throw error;
        }
    }

    async addProduct(cid, pid, quantity) {
        try {
            return await this.cmanager.addProduct(cid, pid, quantity);
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(cid, pid) {
        try {
            return await this.cmanager.deleteProduct(cid, pid);
        } catch (error) {
            throw error;
        }
    }

    async deleteAllProducts(cid) {
        try {
            return await this.cmanager.deleteAllProducts(cid);
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(cid, pid, quantity) {
        try {
            return await this.cmanager.updateProduct(cid, pid, quantity);
        } catch (error) {
            throw error;
        }
    }

    async updateCart(cid, cart) {
        try {
            return await this.cmanager.updateCart(cid, cart);
        } catch (error) {
            throw error;
        }
    }
}

export default new CartsRepository();
