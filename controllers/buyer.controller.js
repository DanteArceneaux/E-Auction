const Buyer = require("../models/buyer.model.js");

const asyncHandler = require("../middleware/async.js");

const ErrorResponse = require("../utils/errorResponse.js");

//@dec    Get all buyers
//@route   GET /api/v1/buyers/
exports.getBuyers = asyncHandler(async (req, res) => {
  const buyers = await Buyer.find();
  res.status(200).json({
    success: true,
    count: buyers.length,
    data: buyers
  });
});

//@desc    Add a new buyer
//@route   POST /api/v1/buyers/add-buyer

//add buyer if buyerID exists when creating buyer
exports.addBuyer = async (req, res) => {
  try {
    await Buyer.create(req.body).then(buyer => {
      res.status(201).json({
        success: true,
        data: buyer
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });

    console.log(err.message.red.bold);
  }
};

//@desc   Get buyer by id
//@route  GET /api/v1/buyers/{buyerID}
exports.getBuyerById = async (req, res, next) => {
  try {
    const buyers = await Buyer.findById(req.params.id);
    if (!buyers) {
      return next(
        new ErrorResponse(`Buyer not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: buyers
    });
  } catch (err) {
    next(new ErrorResponse(`Buyer not found with id of ${req.params.id}`, 404));
    res.status(400).json({
      success: false,
      error: err.message
    });

    console.log(err.message.red.bold);
  }
};

//@desc    Delete a buyer by id
//@route   GET /api/v1/buyers/delete/{buyerId}
exports.deleteBuyerById = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);

    if (!buyer) {
      return res.status(404).json({
        success: false,
        error: "No buyer found"
      });
    }

    await buyer.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });

    console.log(err.message.red.bold);
  }
};

//@desc    Update a buyer by id
//@route   PUT /api/v1/buyers/update/{buyerId}
exports.updateBuyerById = asyncHandler(async (req, res, next) => {
  const buyer = await Buyer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  console.log(req.params.id);

  if (!buyer) {
    return res.status(404).json({
      success: false,
      error: "No buyer found"
    });
  }

  res.status(200).json({
    success: true,
    data: buyer
  });
});
