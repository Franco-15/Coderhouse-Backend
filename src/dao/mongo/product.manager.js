import Exception from "../../exceptions.js";
import productsModel from "./models/products.model.js";

class ProductManager {

    async addProduct(product) {
        try {
            await productsModel.create(product);
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: "Error adding product",
            });
        }
    }

    async getProducts(limit, page, sort, category, status) {

        const options = {
            lean:true,
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            sort: {price:parseInt(sort)} || undefined,
        };

        const query = {};

        if (category) {
            query.category = category;
        }

        if (status) {
            query.status = status;
        }

        try {
            const productsDB = await productsModel.paginate(query,options);
            
            return {
                payload: productsDB.docs,
                totalPages: productsDB.totalPages,
                prevPage: productsDB.prevPage,
                nextPage: productsDB.nextPage,
                page: productsDB.page,
                hasPrevPage: productsDB.hasPrevPage,
                hasNextPage: productsDB.hasNextPage,
                prevLink: productsDB.hasPrevPage ? `./products?page=${productsDB.prevPage}` : null,
                nextLink: productsDB.hasNextPage ? `./products?page=${productsDB.nextPage}` : null,
            };  
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: "Error getting products ",
            });
        }
    }

    async getProductById(pid) {
        try {
            const product = await productsModel.findOne({ _id: pid});
            return product;
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: "Error getting product",
            });
        }
    }

    async updateProduct(pid, productUpdated) {
        try {
            await productsModel.updateOne({ _id: pid }, productUpdated);
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: "Error updating product",
            });
        }
    }

    async deleteProduct(pid) {
        try {
            const productDeleted = await productsModel.deleteOne({ _id: pid });
            return productDeleted;
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: error.message,
            });
        }
    }
}

export const productManager = new ProductManager();