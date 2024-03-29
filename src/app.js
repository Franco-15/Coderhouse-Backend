import express from "express";
import _dirname from "./utils/utils.js";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import database from "./db.js";
import config from "./config/config.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import routerApi from "./routes/router.js";
import { logger_init } from "./utils/logger.js";
import { sendRestoreEmail } from "./utils/restorePassword.js";
import { isEquals, isNotEquals, and, or } from "./utils/helpers.js";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//==== logger ====
app.use(logger_init);

//==== Handlebars setting ====
app.engine("handlebars", handlebars.engine({
    helpers: {
        isEquals,
        isNotEquals,
        and,
        or
    },
    defaultLayout: "main",
}));
app.set("views", path.join(_dirname, 'views'));
app.set("view engine", "handlebars");

//==== Cookies ====
app.use(cookieParser());

//==== Passport ====
app.use(passport.initialize());
initializePassport();

//==== Static files ====
app.use(express.static(path.join(_dirname, 'public')));

//==== Routes ====
routerApi(app);

//==== Email ====
app.post("/restorePassword", sendRestoreEmail);

//==== Server ====
const httpServer = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

//==== mongoose ====
database.connect();
