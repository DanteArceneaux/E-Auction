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
    trim: true
  },
  lastName: {
    type: String,
    required: [true, "Please add a last name"],
    notNull: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    notNull: true,
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
