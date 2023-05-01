import express from "express";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import _dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routers/views.router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//==== Constants ====
const PORT = process.env.PORT || 8080;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//==== Handlebars setting ====
app.engine('handlebars', handlebars.engine())
app.set('views', `${_dirname}/views`)
app.set('view engine', 'handlebars')

//==== Static files ====
app.use(express.static(`${_dirname}/public`));


//==== Routes ====
app.use('/', viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//==== Server ====
const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//==== mongoose ====
await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@ecommerce.cojm0lx.mongodb.net/?retryWrites=true&w=majority`)