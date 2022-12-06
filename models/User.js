const mongoose = require("mongoose");
const slugify = require("slugify");

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin", "seller", "buyer"],
    default: "buyer",
    required: [true, "Please add a role: admin, seller or buyer"],
    max_length: [30, "Role can not be more than 30 characters"],
    trim: true
  },
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
  email: {
    type: String,
    required: [true, "Please add an email"],
    notNull: true,
    min_length: [5, "Email must be at least 5 characters"],
    max_length: [100, "Email can not be more than 100 characters"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ],
    trim: true
  },
  pin: {
    type: Number,
    required: [true, "Please add a pin"],
    notNull: true,
    minlength: [4, "Pin must be at least 100000 (must be a number)"],
    maxlength: [12, "Pin can not be more than 999999 (must be a number)"],
    select: false, // Don't show pin in response
    trim: true
  },
  phone: {
    type: Number,
    required: [true, "Please add a phone number (must be a number)"],
    notNull: true,
    minlength: [
      10,
      "Phone number must be at least 10 digits (must be a number)"
    ],
    max_length: [
      12,
      "Phone number can not be more than 12 digits (must be a number)"
    ],
    trim: true
  },
  resetPinToken: String,
  resetPinExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
