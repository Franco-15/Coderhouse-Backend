import sessionRouter from "./sessions.router.js";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import viewsRouter from "./views.router.js";

export default function routerApi(app) {
    //==== Routes ====
    // app.use("/", viewsRouter);
    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartsRouter);
    // app.use("/api/sessions", sessionRouter);
    app.use("/api/users", usersRouter);
}
