const User = require("../models/User.model");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// ***** @desc   Get all users *****
//@route  GET /api/v1/users
//@access Public *****
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// ***** @desc  Add a new user *****
//@route  POST /api/v1/users/add-user
//@access Public

exports.addUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user
  });
});

//***** @desc  Get a user by id ******
//@route  GET /api/v1/users/:id
//@access Public

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: user
  });
});

// ***** @desc  Delete User by id *****
//@route  DELETE /api/v1/users/:id

exports.deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }
  user.remove();
  res.status(200).json({
    success: true,
    data: {}
  });
});
