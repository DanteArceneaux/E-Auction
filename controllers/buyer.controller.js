const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add a first name"],
    notNull: true,
    min_length: [5, "First name must be at least 2 characters"],
    max_length: [30, "First name can not be more than 30 characters"],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, "Please add a last name"],
    notNull: true,
    min_length: [3, "Last name must be at least 2 characters"],
    max_length: [15, "Last name can not be more than 30 characters"],
    trim: true
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
    notNull: true,
    min_length: [5, "Address must be at least 5 characters"],
    max_length: [100, "Address can not be more than 100 characters"],
    trim: true
  },
  city: {
    type: String,
    required: [true, "Please add a city"],
    notNull: true,
    min_length: [2, "City must be at least 2 characters"],
    max_length: [30, "City can not be more than 30 characters"],
    trim: true
  },
  state: {
    type: String,
    required: [true, "Please add a state"],
    notNull: true,
    min_length: [2, "State must be at least 2 characters"],
    max_length: [30, "State can not be more than 30 characters"],
    trim: true
  },
  pin: {
    type: Number,
    required: [true, "Please add a pin"],
    notNull: true,
    min: [4, "Pin must be at least 100000"],
    max: [12, "Pin can not be more than 999999"],
    trim: true
  },
  phone: {
    type: Number,
    required: [true, "Please add a phone number"],
    notNull: true,
    min: [10, "Phone number must be at least 10 digits"],
    max: [10, "Phone number can not be more than 10 digits"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    notNull: true,
    min_length: [5, "Email must be at least 5 characters"],
    max_length: [30, "Email can not be more than 30 characters"],
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ]
  },
  productId: {
    type: String,
    required: [true, "Please add a product id"],
    notNull: true,
    min_length: [5, "Product id must be at least 5 characters"],
    max_length: [30, "Product id can not be more than 30 characters"],
    trim: true
  },

  bidAmount: {
    type: Number,
    required: [true, "Please add a bid amount"],
    notNull: true,
    min: [1, "Bid amount must be at least 1"],
    max: [100000, "Bid amount can not be more than 100000"],
    trim: true
  }
});

exports.getBuyers = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Show all buyers"
  });
};

exports.placeBid = (req, res) => {
  res.status(201).json({
    success: true,
    message: "Create a new bid"
  });
};

//updatebid
exports.updateBid = (req, res) => {
  res.status(201).json({
    success: true,
    message: "Update a bid"
  });
};
