import ticketModel from "./models/ticket.model.js";
import Exception from "../../exceptions.js";

class TicketManager {
    async createTicket(ticket) {
        try {
            const ticketCreated = ticketModel.create(ticket);
            return ticketCreated;
        } catch (error) {
            throw new Exception(502, {
                status: "error",
                message: "Error creating ticket",
            });
        }
    }

    async getTickets() {
        try {
            const tickets = await ticketModel.find();
            return tickets;
        } catch (error) {
            throw new Exception(404, {
                status: "error",
                message: "Error getting tickets",
            });
        }
    }

    async getTicketByID(cid) {
        try {
            const ticketFromID = await ticketModel
                .findById(cid)
                .populate("products.product")
                .lean();
            return ticketFromID;
        } catch (error) {
            throw new Exception(404, {
                status: "error",
                message: "Error getting ticket by ID",
            });
        }
    }

    async deleteTicket(id) {
        try {
            await ticketModel.deleteOne(
                { _id: cid },
            );
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: "Error to delete ticket by ID",
            });
        }
    }
}

export const ticketManager = new TicketManager();