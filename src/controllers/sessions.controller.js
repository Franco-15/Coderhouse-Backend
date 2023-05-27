import passport from "passport";

//===== REGISTER =====
export async function register(req, res) {
    return res.send({ status: "success", message: "user registered" });
}

export async function failregister(req, res) {
    return res.status(400).send({ status: "error", error: "Register error" });
}

//===== LOGIN =====
export async function login(req, res) {
    if (!req.user)
        return res
            .status(400)
            .send({ status: "error", error: "User not logged" });

    req.session.user = req.user;
    let user = req.session.user;

    user.password = undefined;

    res.send({
        status: "success",
        message: "Logged In",
        payload: user,
    });
}

export async function faillogin(req, res) {
    return res.status(400).send({ status: "error", error: "Login error" });
}

//===== LOGOUT =====
export async function logout(req, res) {
    try {
        req.session.destroy();

        return res.send({
            status: "success",
            message: "logout completed",
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Logout error",
        });
    }
}

//===== GITHUB =====

export async function githubResponse(req, res) {
    req.session.user = req.user;
    res.redirect("/products");
}


//===== CURRENT =====
export function current(req, res) {
    if (!req.session.user)
        return res
            .status(400)
            .send({ status: "error", error: "User not logged" });
    else
        return res.send({
            status: "success",
            message: "User logged",
            payload: req.session.user,
        });
}
