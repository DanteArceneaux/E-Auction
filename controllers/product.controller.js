const mongoose = require("mongoose");
const Category = require("../models/Category.enum.ts");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please add a name"],
    notNull: true,
    min_length: [5, "Product name must be at least 5 characters"],
    max_length: [30, "Product name can not be more than 30 characters"],
    trim: true
  },

  slug: String,

  shortDescription: {
    type: String,
    required: [true, "Please add a short description"],
    max_length: [500, "Description can not be more than 500 characters"],
    trim: true
  },
  detailedDescription: {
    type: String,
    required: [true, "Please add a detailed description"],
    max_length: [1000, "Description can not be more than 1000 characters"],
    trim: true
  },
  productCategory: {
    type: String,
    enum: ["Painting", "Sculptor", "Ornament"],
    required: [true, "Please add a category: Painting, Sculptor or Ornament"],
    max_length: [30, "Category can not be more than 30 characters"],
    trim: true
  },
  startingPrice: {
    type: Number,
    required: [true, "Please add a starting price"],
    min: [0, "Starting price must be at least 0"],
    trim: true
  },
  bidEndDate: {
    type: Date,
    required: [true, "Please add a bid end date"],
    trim: true
  }
});

//@desc    Get all sellers
//@route   GET /api/v1/sellers
exports.getSellers = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Show all sellers"
  });
};

//@desc    Add a new product
//@route   POST /api/v1/sellers/add-product
exports.addProduct = (req, res) => {
  res.status(201).json({
    success: true,
    message: "Create a new product"
  });
};

//@desc    Delete a product by id
//@route   GET /api/v1/sellers/delete/{productId}
exports.deleteProductById = (req, res) => {
  res.status(200).json({
    success: true,
    message: `Delete product ID: ${req.params.id}`
  });
};
