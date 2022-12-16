const mongoose = require("mongoose");
const Product = require("./Product.model");
const ErrorResponse = require("../utils/errorResponse.js");

const bidsSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.ObjectId,
    ref: "Buyer",
    required: false
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: false
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
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

//pre save hook to allow one bid based on email per product
bidsSchema.pre("save", async function(done) {
  if (this.isNew) {
    const bid = await this.constructor.findOne({
      email: this.email,
      product: this.product
    });
    if (bid) {
      throw new ErrorResponse(
        `You have already placed a bid on this product`,
        400
      );
    }
  }
  done();
});

//pre save hook constraint bidAmount to be greater than startingPrice
bidsSchema.pre("save", async function(done) {
  if (this.isNew) {
    const product = await Product.findById(this.product).select(
      "startingPrice"
    );
    if (this.bidAmount < product.startingPrice) {
      throw new ErrorResponse(
        `Bid amount must be greater than starting price`,
        400
      );
    }
  }
  done();
});

module.exports = mongoose.model("Bids", bidsSchema);
