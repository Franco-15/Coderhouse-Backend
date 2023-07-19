import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import bcrypt from "bcrypt";

// __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename).split("\\").slice(0, -1).join("\\");

// hash password
export const createHash = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) =>
    bcrypt.compareSync(password, user.password);

export default __dirname;

export const authorization = (role) => {
    return async (req, res, next) => {
      const { user } = req.user;
      if (user && user.role != role)
        return res.status(403).send({ error: "No permissions" });
  
      next();
    };
  };
  