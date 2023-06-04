import mongoose from "mongoose";
import config from "../config/config.js";

export let persistance = undefined;

switch (config.persistance) {
  case "mongodb":
    mongoose.connect(config.dbUrl);
    const {cartManager} = await import ("../dao/mongo/cart.manager.js");
    const {productManager} = await import("../dao/mongo/product.manager.js");
    const {userManager} = await import("../dao/mongo/user.manager.js");
    
    persistance = {
        cartManager: cartManager,
        productManager: productManager,
        userManager: userManager,
    };
    break;

  case "memory":
    console.log("Using memory persistance. Not implemented yet");
    break;
}
