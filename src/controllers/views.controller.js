import viewsService from "../services/views.service.js";
import usersService from "../services/users.service.js";
import ticketsService from "../services/tickets.service.js";

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
        res.render("products", {
            ...render,
            helpers: {
                isAdmin: (role) => role === "admin",
                isUser: (role) => role === "user",
            },
        });
    } catch (error) {
        req.logger.error(error);
        res.status(error.status).send(error.message);
    }
}

export async function viewCart(req, res) {
    const cid = req.params.cid;
    const { user } = req.user;

    try {
        const cart = await viewsService.viewCart(cid);
        if (cart) {
            res.render("cart", {
                cart: cart,
                user: user,
            });
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
            res.render("product", {
                ...infoRender,
                helpers: {
                    isAdmin: (role) => role === "admin",
                    isUser: (role) => role === "user",
                },
            });
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
    const { user } = req.user;
    res.render("messages", { user });
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

export async function viewUser(req, res) {
    const { user } = req.user;

    try {
        const userGetted = await usersService.getUserById(user.id);
        if (!userGetted) {
            return res.status(404).send({
                status: "error",
                message: `Error getting user with id: ${id}`,
            });
        }
        res.render("user", { user: userGetted });
    } catch (error) {
        req.logger.error(error);
        res.status(error.status).send(error.message);
    }
}

export function viewManageProducts(req, res) {
    const { user } = req.user;
    try {
        res.render("manageProducts", { user });
    } catch (error) {
        req.logger.error(error);
        res.status(error.status).send(error.message);
    }
}

export async function viewChangePassword(req, res) {
    const { email } = req.user
    try {
        const user = await usersService.getUserByEmail(email);

        const data = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            age: user.age,
            role: user.role,
            cartId: user.cartId,
            id: user._id.toString(),
        }
        res.render("restorePassword", { user: data });
    } catch (error) {
        req.logger.error(error);
    }
}

export function viewForgotPassword(req, res) {
    try {
        res.render("forgotPass");
    } catch (error) {
        req.logger.error(error);
        res.status(error.status).send(error.message);
    }
}

export function viewPayment(req, res) {
    const { user } = req.user;
    try {
        res.render("payment", { user });
    } catch (error) {
        req.logger.error(error);
        res.status(error.status).send(error.message);
    }
}

export async function viewTicket(req, res) {
    const { user } = req.user;
    const { tid } = req.params;

    try {
        const ticket = await ticketsService.getTicketByID(tid);
        if (!ticket) {
            return res.status(404).send({
                status: "error",
                message: `Error getting ticket with id: ${tid}`,
            });
        }
        let newTicket = {
            ...ticket
        }
        newTicket = newTicket._doc

        res.render("ticket", { newTicket ,user});
    } catch (error) {
        req.logger.error(error);
        res.status(error.status).send(error.message);
    }
}