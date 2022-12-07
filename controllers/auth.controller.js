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

  sendTokenResponse(user, 200, res);
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

  sendTokenResponse(user, 200, res);
});

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token
    });
};

// desc Get current logged in user
// @route GET /api/v1/auth/me
// @access Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});
