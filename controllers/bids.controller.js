const User = require("../models/User.model.js");

const Product = require("../models/Product.model.js");
const Bids = require("../models/Bids.model.js");
const asyncHandler = require("../middleware/async.js");

const ErrorResponse = require("../utils/errorResponse.js");
const { count } = require("../models/User.model.js");
const { idText } = require("typescript");
const { array } = require("prop-types");

const pastBidsArray = [];
const currentBidArray = [];

//@dec    Get all bids
//@route   GET /api/v1/bids
exports.getBids = asyncHandler(async (req, res, next) => {
  let query;

  //find all bids and include product and buyer
  const reqQuery = { ...req.query };

  //Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  //Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  //Create query string
  let queryStr = JSON.stringify(reqQuery);

  //Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  //Finding resource
  query = Bids.find(JSON.parse(queryStr)).populate({
    path: "product",
    //shortDescription, detailedDescription, productCategory, bidEndDate
    select:
      "productName shortDescription detailedDescription productCategory bidEndDate"
  });

  //Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //Sort descending order by bidAmount
  query = query.sort("-bidAmount");

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;

  const limit = parseInt(req.query.limit, 10) || 25;

  const startIndex = (page - 1) * limit;

  const endIndex = page * limit;

  const total = await Bids.countDocuments();

  query = query.skip(startIndex).limit(limit);

  //Executing query

  const bids = await query;

  //Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: bids.length,
    pagination,
    data: bids
  });
});

//@dec    Create a new bid
//@route   POST /api/v1/bids
exports.addBid = asyncHandler(async (req, res, next) => {
  const bid = await Bids.create(req.body);

  const {
    buyerId,
    productId,
    bidAmount,
    productName,
    shortDescription,
    detailedDescription,
    productCategory,
    startingPrice,
    bidEndDate,
    seller,
    email
  } = req.body;

  res.status(201).json({
    success: true,
    data: bid
  });
});

//@desc    Get bid by productName
//@route   GET /api/v1/bids/productName/{productName}
exports.getBidByProductName = asyncHandler(async (req, res) => {
  const bids = await Bids.find({ productName: req.params.productName });
  res.status(200).json({
    success: true,
    count: bids.length,
    data: bids
  });
});
