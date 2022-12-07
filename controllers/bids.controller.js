const User = require("../models/User.model.js");

const Product = require("../models/Product.model.js");
const Bids = require("../models/Bids.model.js");
const asyncHandler = require("../middleware/async.js");

const ErrorResponse = require("../utils/errorResponse.js");

//@dec    Get all bids
//@route   GET /api/v1/bids
exports.getBids = asyncHandler(async (req, res) => {
  const bids = await Bids.find();
  res.status(200).json({
    success: true,
    count: bids.length,
    data: bids
  });
});

//@dec    Create a new bid
//@route   POST /api/v1/bids
exports.addBid = asyncHandler(async (req, res) => {
  const { buyer, product, bidAmount } = req.body;
  const buyerId = req.user.id;
  const productId = await Product.findById(product);
  const bid = await Bids.create({
    buyer: buyerId,
    product: productId,
    bidAmount
  });
  res.status(201).json({
    success: true,
    data: bid
  });
});
