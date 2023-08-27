import { Router } from "express";
import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  changeRole,
  loadFiles,
  deleteInactiveUsers,
} from "../controllers/users.controller.js";
import { authorization } from "../utils/utils.js";
import passport from "passport";
import { uploader } from "../utils/multer.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);

usersRouter.get("/:id", getUserById);

usersRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorization(["admin"]),
  addUser
);

usersRouter.delete(
  "/",
  deleteInactiveUsers
);

usersRouter.put("/:id", updateUser);

usersRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorization(["admin"]),
  deleteUser
);

usersRouter.post(
  "/premium/:uid",
  passport.authenticate("jwt", { session: false }),
  authorization(["user", "premium"]),
  changeRole
);

usersRouter.post(
  "/:uid/documents",
  passport.authenticate("jwt", { session: false }),
  uploader.fields([
    { name: "identification" },
    { name: "direction" },
    { name: "accountStatus" },
  ]),
  loadFiles
);
export default usersRouter;
