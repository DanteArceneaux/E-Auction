const asyncHandler = require("../middleware/async.js");
const User = require("../models/User.js");

// @desc    Register user
// @route   POST /api/v1/auth/register

exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, pin, phone } = req.body;

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    pin,
    phone
  });

  res.status(200).json({ success: true, data: user });
});

// Path: routes\auth.js
