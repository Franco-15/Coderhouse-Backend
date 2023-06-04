import {productsRepository} from '../repositories/index.js';

class ProductsService {
    constructor() {
        this.productsRepository = productsRepository;
    }

    async getProducts(limit, page, sort, category, status) {
        try {
            const products = await this.productsRepository.getProducts(
                limit,
                page,
                sort,
                category,
                status
            );
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await productsRepository.getProductById(id);
            return product;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async addProduct(product) {
        product.stock > 0 ? (product.status = true) : (product.status = false);
        try {
            const newProduct = await productsRepository.addProduct(product);
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, product) {
        try {
            const { quantity, thumbnails } = product;

            const productDB = await productsRepository.getProductById(id);

            let newStock = productDB.stock;
            let newStatus = productDB.status;
            let newThumbnails = productDB.thumbnails;

            if (quantity) {
                newStock += quantity;
                newStock > 0 ? (newStatus = true) : (newStatus = false);
            }
            if (thumbnails)
                newThumbnails = thumbnails

            product = {
                ...product,
                stock: newStock,
                status: newStatus,
                thumbnails: newThumbnails,
            };

            const productUpdated = await productsRepository.updateProduct(
                id,
                product
            );
            return productUpdated;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const productDeleted = await productsRepository.deleteProduct(id);
            return productDeleted;
        } catch (error) {
            throw error;
        }
    }
}

export default new ProductsService();
