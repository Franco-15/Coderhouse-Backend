import { Router } from "express";

import UserManager from "../dao/dbManagers/user.manager.js";

const usersRouter = Router();
const userManager = new UserManager();

usersRouter.get("/", async (req, res) => {
    try {
        const users = await userManager.getUsers();
        return res.send({ status: "Success", payload: users });
    } catch (error) {
        return res
            .status(error.status)
            .send({ status: "error", message: error.message });
    }
});

export default usersRouter;
