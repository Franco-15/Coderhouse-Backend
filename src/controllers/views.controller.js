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
        console.log(error);
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
        console.log(error);
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

        console.log(infoRender);

        if (product) {
            res.render("product", infoRender);
        } else {
            res.status(404).send({
                status: "error",
                message: "Not found product",
            });
        }
    } catch (error) {
        console.log(error);
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

//===== CURRENT USER =====
export function viewCurrent(req, res) {
    
    const {user} = req.user;
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