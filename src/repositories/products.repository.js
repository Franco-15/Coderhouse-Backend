import ProductManager from "../dao/mongo/product.manager.js";

class ProductsRepository {
    constructor() {
        this.pmanager = new ProductManager();
    }

    async getProducts(limit, page, sort, category, status) {
        try {
            return await this.pmanager.getProducts(
                limit,
                page,
                sort,
                category,
                status
            );
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            return await this.pmanager.getProductById(id);
        } catch (error) {
            throw error;
        }
    }

    async addProduct(product) {
        try {
            return await this.pmanager.addProduct(product);
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, product) {
        try {
            return await this.pmanager.updateProduct(id, product);
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            return await this.pmanager.deleteProduct(id);
        } catch (error) {
            throw error;
        }
    }
}

export default new ProductsRepository();
