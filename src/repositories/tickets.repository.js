
export default class TicketsRepository {
    constructor(persistance) {
        this.persistance = persistance;
    }

    async createTicket(ticket) {
        try {
            const ticketCreated = this.persistance.createTicket(ticket);
            return ticketCreated;
        } catch (error) {
            throw error;
        }
    }

    async getTickets() {
        try {
            const tickets = await this.persistance.getTickets();
            return tickets;
        } catch (error) {
            throw error;
        }
    }

    async getTicketByID(id) {
        try {
            const ticketFromID = await this.persistance.getTicketByID(id);
            return ticketFromID;
        } catch (error) {
            throw error;
        }
    }

    async deleteTicket(id) {
        try {
            await this.persistance.deleteTicket(id);
        } catch (error) {
            throw error;
        }
    }
}