const Seller = require("../models/Seller.model.js");
const asyncHandler = require("../middleware/async.js");

//@dec    Get all products
//@route   GET /api/v1/sellers/products
exports.getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json({
      success: true,
      count: sellers.length,
      data: sellers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

//@desc    Add a new product
//@route   POST /api/v1/sellers/add-product
exports.addSeller = async (req, res) => {
  try {
    await Seller.create(req.body).then(seller => {
      res.status(201).json({
        success: true,
        data: seller
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

//@desc   Get product by id
//@route  GET /api/v1/sellers/product/{productId}
exports.getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({
        success: false,
        error: "No product found"
      });
    }
    res.status(200).json({
      success: true,
      data: seller
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });

    console.log(err.message.red.bold);
  }
};

//@desc    Delete a product by id
//@route   GET /api/v1/sellers/delete/{productId}
exports.deleteSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return res.status(404).json({
        success: false,
        error: "No product found"
      });
    }

    await seller.remove();

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

//@desc    Update a seller by id
//@route   PUT /api/v1/sellers/update/{sellerId}
exports.updateSellerById = asyncHandler(async (req, res) => {
  const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  //log seller id
  console.log(req.params.id);

  if (!seller) {
    return res.status(404).json({
      success: false,
      error: "No seller found"
    });
  }

  res.status(200).json({
    success: true,
    data: seller
  });
});
