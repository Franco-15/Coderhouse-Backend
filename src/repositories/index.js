import { persistance } from "../dao/factory.js";
import CartsRepository from "./carts.repository.js";
import ProductsRepository from "./products.repository.js";
import UsersRepository from "./users.repository.js";
import TicketsRepository from "./tickets.repository.js";

const { cartManager, productManager, userManager, ticketManager } = persistance;

export const cartsRepository = new CartsRepository(cartManager);
export const productsRepository = new ProductsRepository(productManager);
export const usersRepository = new UsersRepository(userManager);
export const ticketsRepository = new TicketsRepository(ticketManager);