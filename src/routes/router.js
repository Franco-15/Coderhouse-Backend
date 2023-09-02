import sessionRouter from "./sessions.router.js";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import viewsRouter from "./views.router.js";
import paymentsRouter from "./payments.router.js";
import specs from "../utils/docs.js";
import swaggerUI from "swagger-ui-express";

export default function routerApi(app) {
    //==== Routes ====
    app.use("/", viewsRouter);
    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartsRouter);
    app.use("/api/sessions", sessionRouter);
    app.use("/api/users", usersRouter);
    app.use("/api/payments", paymentsRouter);
    app.use("/apidocs", swaggerUI.serve, swaggerUI.setup(specs));
}
