import { Router } from "express";
import { authorization } from "../utils/utils.js";
import passport from "passport";
import cartsService from "../services/carts.service.js";
import PaymentsService from "../services/payments.service.js";
import usersService from "../services/users.service.js";
import config from "../config/config.js";

const { jwtCookieName } = config;

const paymentsRouter = Router();

paymentsRouter.post("/", passport.authenticate("jwt", { session: false }), authorization(["user", "premium"]), async (req, res) => {
    const userDecoded = usersService.decodeUserFromToken(req.cookies[jwtCookieName]);
    const { user } = userDecoded;

    try {
        const cart = await cartsService.getCartByID(user.cartId);
        if (!cart)
            return res.status(404).send({
                status: "error",
                message: "Cart not found",
            });

        if (cart.products.length === 0)
            return res.status(404).send({
                status: "error",
                message: "Cart is empty",
            });

        let total = 0;
        cart.products.forEach((productCart) => {
            total += productCart.product.price * productCart.quantity;
        });
        const paymentIntentInfo = {
            amount: total,
            currency: "usd",
        }
        const paymentService = new PaymentsService();
        const paymentIntent = await paymentService.createPaymentIntent(paymentIntentInfo);
        if (!paymentIntent)
            return res.status(500).send({
                status: "error",
                message: "Payment not created",
            });

        return res.status(200).send({
            status: "success",
            message: "Payment created",
            payload: paymentIntent,
        });
    }
    catch (error) {
        console.log(error);
        res.status(error.status).send(error.message);
    }
});


export default paymentsRouter;
