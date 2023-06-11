import productsService from "./products.service.js";
import cartsService from "./carts.service.js";

class ViewsService {
    constructor() {}

    async viewProducts(limit, page, sort, category, status) {
        try {
            const products = await productsService.getProducts(
                limit,
                page,
                sort,
                category,
                status
            );

            let infoRender = {
                products: products.payload,
                totalPages: products.totalPages,
                hasPrevPAge: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                limit: limit ? parseInt(limit) : 10,
                page: page ? parseInt(page) : 1,
                sort: sort ? parseInt(sort) : 1,
                category: category ? category : undefined,
                status: status ? status : undefined,
            };

            return infoRender;
        } catch (error) {
            throw error;
        }
    }

    async viewCart(cid) {
        try {
            const cart = await cartsService.getCartByID(cid);
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async viewProduct(pid) {
        try {
            const product = await productsService.getProductById(pid);
            return product._doc;
        } catch (error) {
            throw error;
        }
    }
}

export default new ViewsService();
