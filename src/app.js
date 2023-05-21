import express from "express";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import _dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routers/views.router.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import database from "./db.js";
import config from "./config.js";
import morgan from "morgan";
import sessionRouter from "./routers/sessions.router.js";
import passport from "passport";
import initializePassport from "./auth/passport.config.js";
import usersRouter from "./routers/users.router.js";

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

//==== Session ====
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: config.dbUrl,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
            ttl: 60,
        }),
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: false,
    })
);

//==== Passport ====
app.use(passport.initialize());
app.use(passport.session());
initializePassport();

//==== Static files ====
app.use(express.static(`${_dirname}/public`));

//==== Routes ====
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/users", usersRouter)

//==== Server ====
const httpServer = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

//==== mongoose ====
database.connect();
