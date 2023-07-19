import { persistance } from "../dao/factory.js";
import CartsRepository from "./carts.repository.js";
import ProductsRepository from "./products.repository.js";
import UsersRepository from "./users.repository.js";
import TicketsRepository from "./tickets.repository.js";

const { cart, product, user, ticket } = persistance;

export const cartsRepository = new CartsRepository(cart);
export const productsRepository = new ProductsRepository(product);
export const usersRepository = new UsersRepository(user);
export const ticketsRepository = new TicketsRepository(ticket);