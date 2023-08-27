import multer from "multer";
import __dirname from "./utils.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let subfolder = file.fieldname;
        if (
          file.fieldname === "identification" ||
          file.fieldname === "direction" ||
          file.fieldname === "accountStatus"
        ){
          subfolder = '/documents'
        }
        cb(null, `${__dirname}/public/${subfolder}`);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

export const uploader = multer({ storage: storage });