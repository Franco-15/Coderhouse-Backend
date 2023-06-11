

export default class CartsRepository {
    constructor(persistance) {
        this.persistance = persistance;
    }

    async getCartByID(cid) {
        try {
            return await this.persistance.getCartByID(cid);
        } catch (error) {
            throw error;
        }
    }

    async createCart(cart) {
        try {
            return await this.persistance.createCart(cart);
        } catch (error) {
            throw error;
        }
    }

    async addProduct(cid, pid, quantity) {
        try {
            return await this.persistance.addProduct(cid, pid, quantity);
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(cid, pid) {
        try {
            return await this.persistance.deleteProduct(cid, pid);
        } catch (error) {
            throw error;
        }
    }

    async deleteAllProducts(cid) {
        try {
            return await this.persistance.deleteAllProducts(cid);
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(cid, pid, quantity) {
        try {
            return await this.persistance.updateProduct(cid, pid, quantity);
        } catch (error) {
            throw error;
        }
    }

    async updateCart(cid, cart) {
        try {
            return await this.persistance.updateCart(cid, cart);
        } catch (error) {
            throw error;
        }
    }
}