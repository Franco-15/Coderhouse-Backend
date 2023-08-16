import { Router } from "express";
import { getUsers, getUserById, addUser, updateUser, deleteUser, changeRole } from "../controllers/users.controller.js";
import { authorization } from "../utils/utils.js";
import passport from "passport";

const usersRouter = Router();

usersRouter.get("/", getUsers);

usersRouter.get("/:id", getUserById);

usersRouter.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    authorization(["admin"]),
    addUser
);

usersRouter.put(
    "/:id",
    updateUser
);

usersRouter.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    authorization(["admin"]),
    deleteUser
);

usersRouter.post("premium/:uid",passport.authenticate("jwt", { session: false }), authorization(["user","premium"]), changeRole);
export default usersRouter;
