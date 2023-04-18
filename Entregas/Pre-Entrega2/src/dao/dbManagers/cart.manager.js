import cartsModel from "../models/cart.model.js";
import Exception from "../../exceptions.js";

export default class CartManager {
    async createCart(cart) {
        try {
            const cartCreated = cartsModel.create(cart);
            return cartCreated;
        } catch (error) {
            throw new Exception(502, {
                status: "error",
                message: "Error creating cart",
            });
        }
    }

    async getCarts() {
        try {
            const carts = await cartsModel.find();
            return carts;
        } catch (error) {
            throw new Exception(404, {
                status: "error",
                message: "Error getting carts",
            });
        }
    }

    async getCartByID(cid) {
        try {
            const cartFromID = await cartsModel
                .findById(cid)
                .populate("products.product");
            return cartFromID;
        } catch (error) {
            throw new Exception(404, {
                status: "error",
                message: "Error getting cart by ID",
            });
        }
    }

    async addProduct(cid, pid, quantity) {
        try {
            await cartsModel.updateOne(
                { _id: cid },
                { $push: { products: { product: pid, quantity: quantity } } }
            );
        } catch (error) {
            throw new Exception(502, {
                status: "error",
                message: "Error adding product to cart",
            });
        }
    }

    async deleteProduct(cid, pid) {
        try {
            await cartsModel.updateOne(
                { _id: cid },
                {
                    $pull: { products: { product: pid } },
                }
            );
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: error.message,
            });
        }
    }

    async deleteProducts(cid) {
        try {
            await cartsModel.updateOne(
                { _id: cid },
                {
                    $pull: { products: {} },
                }
            );
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: error.message,
            });
        }
    }

    async updateCart(cid, products) {
        try {
            await cartsModel.updateOne(
                { _id: cid },
                { $set: { products: products } }
            );
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: error.message,
            });
        }
    }

    async updateProduct(cid, pid, quantity) {
        try {
            await cartsModel.updateOne(
            {
                _id: cid,
                "products.product":pid // Busca el producto con el id pid dentro del carrito cid
            },
            {
                $set: {
                    "products.$.quantity":quantity // Actualiza la cantidad del producto encontrada
                }
            }
        );
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: error.message,
            });
        }
    }
}
