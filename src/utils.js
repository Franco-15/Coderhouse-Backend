import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker/locale/es";

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
export const createHash = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) =>
    bcrypt.compareSync(password, user.password);

export const uploader = multer({ storage });
export default __dirname;

export const authorization = (role) => {
    return async (req, res, next) => {
      const { user } = req.user;
      if (user && user.role != role)
        return res.status(403).send({ error: "No permissions" });
  
      next();
    };
  };


  // Generate products
  export const generateProducts = (quantity) => {
    
    if (quantity === 1)
        return generateProduct();
    
    let products = [];

    for (let i = 0; i < quantity; i++) {
      products.push(generateProduct());
    }
    return products;
  };

  export const generateProduct = () => {
    return {
      id: faker.database.mongodbObjectId(),
      code: faker.string.alphanumeric(8),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      status: faker.datatype.boolean(),
      stock: faker.number.int({ min: 0, max: 100 }),
      category: faker.commerce.department(),
      thumbnails: [faker.image.imageUrl()],
    }
}