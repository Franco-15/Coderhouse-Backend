import viewsService from "../services/views.service.js";

export async function viewProducts(req, res) {
    const { limit, page, sort, category, status } = req.query;
    const { user } = req.user;

    try {
        let products = await viewsService.viewProducts(
            limit,
            page,
            sort,
            category,
            status
        );

        let render = {
            products: products,
            user: user,
        };
        res.render("products", render);
    } catch (error) {
        req.logger.error(error);
        res.status(error.status).send(error.message);
    }
}

export async function viewCart(req, res) {
    const cid = req.params.cid;

    try {
        const cart = await viewsService.viewCart(cid);

        if (cart) {
            res.render("cart", { cart });
        } else {
            res.status(404).send({
                status: "error",
                message: "Not found cart",
            });
        }
    } catch (error) {
        req.logger.error(error);
        res.status(error.status).send(error.message);
    }
}

export async function viewProduct(req, res) {
    const pid = req.params.pid;
    const { user } = req.user;
    try {
        const product = await viewsService.viewProduct(pid);
        let infoRender = {
            product: product,
            user: user,
        };

        if (product) {
            res.render("product", infoRender);
        } else {
            res.status(404).send({
                status: "error",
                message: "Not found product",
            });
        }
    } catch (error) {
        req.logger.error(error);
        res.status(error.status).send(error.message);
    }
}

export function viewLogin(req, res) {
    res.render("login");
}

export function viewRegister(req, res) {
    res.render("register");
}

export function viewMain(req, res) {
    res.render("login");
}

export function viewCurrent(req, res) {
    const { user } = req.user;
    if (!user)
        return res
            .status(400)
            .send({ status: "error", error: "User not logged" });
    else
        return res.send({
            status: "success",
            message: "User logged",
            payload: user,
        });
}

export function viewMessages(req, res) {
    res.render("messages");
}

export function viewLogger(req, res) {
    const loggerMessages = {
        fatal: req.logger.fatal("Fatal message"),
        error: req.logger.error("Error message"),
        warning: req.logger.warning("Warning message"),
        info: req.logger.info("Info message"),
        http: req.logger.http("Http message"),
        debug: req.logger.debug("Debug message"),
    };
    res.send({ message: "resultados en consola" });
}
