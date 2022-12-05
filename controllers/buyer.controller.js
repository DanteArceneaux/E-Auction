const Buyer = require("../models/buyer.model.js");

//@dec    Get all products
//@route   GET /api/v1/buyers/products
exports.getBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.status(200).json({
      success: true,
      count: buyers.length,
      data: buyers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

//@desc    Add a new product
//@route   POST /api/v1/buyers/add-product
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

//@desc   Get product by id
//@route  GET /api/v1/buyers/product/{productId}
exports.getBuyerById = async (req, res) => {
  try {
    const Buyer = await Buyer.findById(req.params.id);
    if (!buyer) {
      return res.status(404).json({
        success: false,
        error: "No product found"
      });
    }
    res.status(200).json({
      success: true,
      data: buyer
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
//@route   GET /api/v1/buyers/delete/{productId}
exports.deleteBuyerById = async (req, res) => {
  try {
    const Buyer = await Buyer.findById(req.params.id);

    if (!buyer) {
      return res.status(404).json({
        success: false,
        error: "No product found"
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

//@desc    Update a product by id
//@route   PUT /api/v1/buyers/update/{productId}
exports.updateBuyerById = async (req, res) => {
  try {
    const Buyer = await Buyer.findByIdAndUpdate(req.params.id, req.body);

    if (!buyer) {
      return res.status(404).json({
        success: false,
        error: "No product found"
      });
    }

    res.status(200).json({
      success: true,
      data: buyer
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });

    console.log(err.message.red.bold);
  }
};
