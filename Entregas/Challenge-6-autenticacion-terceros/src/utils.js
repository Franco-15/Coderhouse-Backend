import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import brcypt from "bcrypt";

// __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/images`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// hash password
export const createHash = password => brcypt.hashSync(password, brcypt.genSaltSync(10));
export const isValidPassword = (password, user) => brcypt.compareSync(password, user.password);


export const uploader = multer({ storage });
export default __dirname;
