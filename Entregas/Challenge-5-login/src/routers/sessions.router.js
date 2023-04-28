import { Router } from "express";
import userModel from "../dao/models/user.model.js";

const sessionRouter = Router();

sessionRouter.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res
                .status(400)
                .send({ status: "error", error: "User already exists" });
        }

        const user = {
            first_name,
            last_name,
            email,
            age,
            password,
        };
        await userModel.create(user);
        return res.send({ status: "success", message: "user registered" });
    } catch (error) {
        res.send({ status: "error", message: "register error"});
    }
});

sessionRouter.post("/login", async (req, res) => {
    const admin = {
        email: "adminCoder@coder.com",
        password: "adminCod3r123",
        name: "Admin Coder",
    };

    try {
        const { email, password } = req.body;

        if (email === admin.email && password === admin.password) {
            req.session.user = {
                name: admin.name,
                email: admin.email,
                rol: "admin",
            };
        } else {
            const user = await userModel.findOne({ email, password });

            if (!user) {
                return res
                    .status(400)
                    .send({ status: "error", error: "Incorrect credentials" });
            }

            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                rol: "user",
            };
        }

        res.send({
            status: "success",
            message: "Logged In",
            payload: req.session.user,
        });
    } catch (error) {
        console.log(error);
    }
});

sessionRouter.get("/logout", (req, res) => {
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
});

export default sessionRouter;
