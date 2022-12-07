const mongoose = require("mongoose");
const Product = require("./Product.model");
const ErrorResponse = require("../utils/errorResponse.js");

const bidsSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.ObjectId,
    ref: "Buyer",
    required: true
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true
  },
  bidAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Bids", bidsSchema);
