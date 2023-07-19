import mongoose from "mongoose";
import config from "../config/config.js";

export let persistance = undefined;

switch (config.persistance) {
  case "mongodb":
    mongoose.connect(config.dbUrl);
    const {cart} = await import ("../dao/mongo/cart.dao.js");
    const {product} = await import("../dao/mongo/product.dao.js");
    const {user} = await import("../dao/mongo/user.dao.js");
    const {ticket} = await import("../dao/mongo/ticket.dao.js");
    
    persistance = {
        cart: cart,
        product: product,
        user: user,
        ticket: ticket
    };
    break;

  case "memory":
    console.log("Using memory persistance. Not implemented yet");
    break;
}
