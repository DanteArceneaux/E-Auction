const asyncHandler = require("../middleware/async.js");
const User = require("../models/User.js");
const ErrorResponse = require("../utils/errorResponse.js");

// @desc    Register user
// @route   POST /api/v1/auth/register

exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, pin, phone, role } = req.body;

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    pin,
    phone,
    role
  });

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc    Login user
// @route   POST /api/v1/auth/login

exports.login = asyncHandler(async (req, res, next) => {
  const { email, pin } = req.body;

  // Validate email & pin
  if (!email || !pin) {
    return next(new ErrorResponse("Please provide an email and pin", 400));
  }

  // Check for user
  const user = await User.findOne({
    email
  }).select("+pin");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if pin matches
  const isMatch = await user.matchPin(pin);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
