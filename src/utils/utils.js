import { fileURLToPath } from "url";
import path, { dirname } from "path";
import bcrypt from "bcrypt";

// __dirname
const __filename = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(__filename)
const __dirname = path.join(currentDirectory, '..')

// hash password
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export default __dirname;

export const authorization = (roles) => {
  return async (req, res, next) => {
    const { user } = req.user;
    if (user && !roles.includes(user.role))
      return res.status(403).send({ error: "No permissions" });

    next();
  };
};
