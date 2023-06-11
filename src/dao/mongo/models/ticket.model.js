import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  purchase_datetime: Date,
  amount:{
    type: Number,
    default: 0,
  },
  purchaser: String,
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;
