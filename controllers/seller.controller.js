const Product = require("../models/Product.model.js");

//@dec    Get all sellers
//@route   GET /api/v1/sellers

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

//@desc    Add a new seller
//@route   POST /api/v1/sellers/add-seller
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

//@desc   Get seller by id
//@route  GET /api/v1/sellers/seller/{sellerId}
exports.getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
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
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });

    console.log(err.message.red.bold);
  }
};

//@desc   Update seller by id
//@route  PUT /api/v1/sellers/seller/{sellerId}
exports.updateSellerById = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
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
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });

    console.log(err.message.red.bold);
  }
};

//@desc   Delete seller by id
//@route  DELETE /api/v1/sellers/seller/{sellerId}
exports.deleteSellerById = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) {
      return res.status(404).json({
        success: false,
        error: "No seller found"
      });
    }
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

//@desc   Get seller by id
//@route  GET /api/v1/sellers/seller/{sellerId}
exports.getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
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
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });

    console.log(err.message.red.bold);
  }
};

//@desc   Update seller by id
//@route  PUT /api/v1/sellers/seller/{sellerId}
exports.updateSellerById = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
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
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });

    console.log(err.message.red.bold);
  }
};
