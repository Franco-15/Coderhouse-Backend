import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

export default class PaymentsService {
    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }

    async createPaymentIntent(paymentData) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.create(paymentData);
            return paymentIntent;
        } catch (error) {
            throw error;
        }
    }
}