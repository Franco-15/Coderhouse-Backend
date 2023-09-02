import Exception from "../exceptions.js";
import { cartsRepository } from "../repositories/index.js";
import productsService from "./products.service.js";
import ticketsService from "./tickets.service.js";
import { sendMail } from "../utils/email.js";

class CartsService {
    constructor() { }

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

            cartProducts.forEach(async (cartProduct) => {
                let dbProduct = dbProducts.find(
                    (product) =>
                        product.id ===
                        cartProduct.product._id.toString()
                );
                await productsService.updateProduct(dbProduct.id, {
                    stock: dbProduct.stock - cartProduct.quantity,
                });
            });

            const ticketData = {
                cart: cart,
                user: user,
            };

            let newTicket = await ticketsService.createTicket(ticketData);
            console.log(newTicket);
            console.log(user);
            console.log(cart);
            const emailData = {
                to: "francomante1510@gmail.com",
                subject: "Ticket de compra",
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Confirmación de Compra</title>
                </head>
                <body>
                    <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px; text-align: center;">
                        <h1 style="color: #333;">¡Gracias por su compra!</h1>
                        <p style="color: #555;">El total de su compra es de $${newTicket.amount}</p>
                        <p style="color: #555;">El ticket de su compra es el siguiente:</p>
                        <ul style="list-style-type: none; padding: 0;">
                            <li style="margin: 10px 0; color: #555;">Código: ${newTicket.code}</li>
                            <li style="margin: 10px 0; color: #555;">Fecha: ${newTicket.purchase_datetime}</li>
                            <li style="margin: 10px 0; color: #555;">Total: $${newTicket.amount}</li>
                            <li style="margin: 10px 0; color: #555;">Productos:
                                <ul style="list-style-type: none; padding: 0;">
                                    ${cart.products.map(
                    (product) =>
                        `<li style="margin: 5px 0; color: #555;">${product.product.title} - ${product.quantity} unidades</li>`
                ).join("")}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </body>
                </html>`

            };
            await sendMail(emailData);
            await cartsRepository.deleteAllProducts(cid);
            return newTicket;
        } catch (error) {
            throw error;
        }
    }
}

export default new CartsService();
