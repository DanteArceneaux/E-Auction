const mongoose = require("mongoose");
const slugify = require("slugify");
//bcrypt
const bcrypt = require("bcryptjs");
//jwt
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, "Please add a role"],
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

//Encrypt pin using bcrypt
UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  //change pin to string.  bcrypt only accepts strings
  this.pin = await bcrypt.hash(this.pin.toString(), salt);
});

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

module.exports = mongoose.model("User", UserSchema);
