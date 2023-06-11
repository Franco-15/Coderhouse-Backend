
export default class ProductsRepository {
    constructor(persistance) {
        this.persistance = persistance;
    }

    async getProducts(limit, page, sort, category, status) {
        try {
            return await this.persistance.getProducts(
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
            return await this.persistance.getProductById(id);
        } catch (error) {
            throw error;
        }
    }

    async addProduct(product) {
        try {
            return await this.persistance.addProduct(product);
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, product) {
        try {
            return await this.persistance.updateProduct(id, product);
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            return await this.persistance.deleteProduct(id);
        } catch (error) {
            throw error;
        }
    }
}