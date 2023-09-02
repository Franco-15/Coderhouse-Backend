import { ticketsRepository } from "../repositories/index.js";

class TicketsService {

    async createTicket(cartData) {
        try {
            const {cart, user} = cartData;
            const code = Date.now() + Math.floor(Math.random() + 1000 + 1);
            const purchase_datetime = Date.now();
            const amount = cart.products.reduce((acc, product) => {
                return acc + product.product.price * product.quantity;
            }, 0);

            const purchaser = user.email;
            
            const ticket = {
                code: code,
                purchase_datetime: purchase_datetime,
                amount: amount,
                purchaser: purchaser,
            };

            const ticketCreated = ticketsRepository.createTicket(ticket);
            return ticketCreated;
        } catch (error) {
            throw error;
        }
    }

    async getTickets() {
        try {
            const tickets = await ticketsRepository.getTickets();
            return tickets;
        } catch (error) {
            throw error;
        }
    }

    async getTicketByID(id) {
        try {
            const ticketFromID = await ticketsRepository.getTicketByID(id);
            return ticketFromID;
        } catch (error) {
            throw error;
        }
    }

    async deleteTicket(id) {
        try {
            await ticketsRepository.deleteTicket(id);
        } catch (error) {
            throw error;
        }
    }
}

export default new TicketsService();