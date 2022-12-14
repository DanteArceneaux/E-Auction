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
    minlength: [5, "First name must be at least 5 characters"],
    maxlength: [30, "First name can not be more than 30 characters"],
    trim: true
  },
  lastName: {
    type: String,
    minlength: [3, "Last name must be at least 3 characters"],
    maxlength: [25, "Last name can not be more than 25 characters"],
    required: [true, "Please add a last name"],
    notNull: true,
    trim: true
  },
  city: {
    type: String,
    required: [true, "Please add a city"],
    notNull: true,
    trim: true
  },
  state: {
    type: String,
    required: [true, "Please add a state"],
    notNull: true,
    trim: true
  },
  phone: {
    type: Number,
    required: [true, "Please add a phone number (must be a number)"],
    notNull: true,
    validate: {
      validator: function(v) {
        return v.toString().length === 10;
      },
      message: props =>
        `${props.value} is not a valid phone number! Must be 10 digits long.`
    },

    trim: true
  },

  email: {
    type: String,
    required: [true, "Please add an email"],
    notNull: true,
    unique: true,
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
    maxlength: [6, "Pin can not be more than 4 characters"],
    trim: true,
    validate: {
      validator: function(v) {
        return v.toString().length <= 6;
      },
      message: props =>
        `${props.value} is not a valid pin! must be fewer or equal to 6 characters`
    }
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

// match user entered pin to pin in database
UserSchema.methods.matchPin = async function(enteredPin) {
  console.log("enteredPin: ", enteredPin);
  console.log("this.pin: ", this.pin);
  if (enteredPin === this.pin) {
    return true;
  } else {
    return false;
  }
};

module.exports = mongoose.model("User", UserSchema);
