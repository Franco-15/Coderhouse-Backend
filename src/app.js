import express from "express";
import _dirname from "./utils.js";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import database from "./db.js";
import config from "./config/config.js";
import morgan from "morgan";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import routerApi from "./routes/router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//==== Handlebars setting ====
app.engine("handlebars", handlebars.engine());
app.set("views", `${_dirname}/views`);
app.set("view engine", "handlebars");

//==== Cookies ====
app.use(cookieParser());

//==== Passport ====
app.use(passport.initialize());
initializePassport();

//==== Static files ====
app.use(express.static(`${_dirname}/public`));

//==== Routes ====
routerApi(app);

//==== Server ====
const httpServer = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

//==== mongoose ====
database.connect();
