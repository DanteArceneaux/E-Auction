const Product = require("../models/Product.model.js");
const asyncHandler = require("../middleware/async.js");
const User = require("../models/User.model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const Bid = require("../models/Bids.model.js");

// ***** @dec    Get all products *****
//@route   GET /api/v1/sellers/products
//use lookup to combine product with the bid information
exports.getProducts = asyncHandler(async (req, res, next) => {
  //lookup
  const products = await Product.aggregate([
    {
      $lookup: {
        from: "bids",

        localField: "_id",
        foreignField: "product",
        as: "bids"
      }
    }
    //unwind bids and products
  ]);
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// ***** @desc    Get all products by category *****
//@route   GET /api/v1/sellers/products/category/{category}
exports.getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: req.params.category });
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// *****@desc Get product by productName *****
//@route GET /api/v1/sellers/product/productName/{productName}

exports.getProductByProductName = asyncHandler(async (req, res) => {
  //use lookup to combine product with the bid information

  const products = await Product.find({
    productName: req.params.productName
  });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// ***** @desc    Get all products by seller *****
//@route   GET /api/v1/sellers/products/seller/{sellerId}
exports.getProductsBySeller = asyncHandler(async (req, res) => {
  const products = await Product.find({ seller: req.params.sellerId });
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

//  ***** @desc    Get all products by seller and category  *****
//@route   GET /api/v1/sellers/products/seller/{sellerId}/category/{category}
exports.getProductsBySellerAndCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({
    seller: req.params.sellerId,
    category: req.params.category
  });
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// ***** @desc    Get product by bidEndDate  *****
//@route   GET /api/v1/sellers/product/bidEndDate/{bidEndDate}
exports.getProductByBidEndDate = asyncHandler(async (req, res) => {
  const products = await Product.find({ bidEndDate: req.params.bidEndDate });
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// ***** @desc    Add a new product *****
//@route   POST /api/v1/sellers/add-product
exports.addProduct = asyncHandler(async (req, res, next) => {
  const {
    productName,
    shortDescription,
    detailedDescription,
    productCategory,
    startingPrice,
    bidEndDate,
    seller
  } = req.body;

  const sellerId = req.user.id;

  const product = await Product.create({
    productName,
    shortDescription,
    detailedDescription,
    productCategory,
    startingPrice,
    bidEndDate,
    seller: sellerId
  });

  //Error handling if bidEndDate is not in the future
  if (product.bidEndDate < Date.now()) {
    return next(
      new ErrorResponse(
        `Bid end date must be in the future. Bid end date: ${product.bidEndDate}`,
        400
      )
    );
  }

  res.status(201).json({
    success: true,
    data: product
  });
});

// ***** @desc   Get product by id *****
//@route  GET /api/v1/sellers/product/{productId}
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "No product found"
      });
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });

    console.log(err.message.red.bold);
  }
};

// ***** @desc    Delete a product by id *****
//@route   GET /api/v1/sellers/delete/{productId}
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "No product found"
      });
    }

    //find bids associated with the product
    const bids = await Bid.find({ product: req.params.id });
    if (bids.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Cannot delete a product with bids"
      });
    }

    await product.remove();

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

// ***** @desc    Update a product by id *****
//@route   PUT /api/v1/sellers/update/{productId}
exports.updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "No product found"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });

    console.log(err.message.red.bold);
  }
};
