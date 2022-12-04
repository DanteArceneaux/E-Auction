const Product = require("../models/Product.model.js");

//@dec    Get all products
//@route   GET /api/v1/sellers/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

//@desc    Add a new product
//@route   POST /api/v1/sellers/add-product
exports.addProduct = async (req, res) => {
  try {
    await Product.create(req.body).then(product => {
      res.status(201).json({
        success: true,
        data: product
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

//@desc    Delete a product by id
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
