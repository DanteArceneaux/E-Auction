const mongoose = require("mongoose");
const slugify = require("slugify");

let d = new Date(Date.now());
d.toString();

const ProductSchema = new mongoose.Schema({
  //seller

  productName: {
    type: String,
    unique: true,
    required: [true, "Please add a name"],
    notNull: true,
    minLength: [5, "Product name must be at least 5 characters"],
    maxLength: [30, "Product name can not be more than 30 characters"],
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
    //date must be in the future
    validate: {
      validator: function(v) {
        return v > Date.now();
      },
      message: `Bid end date must be in the future.  Todays date is: ${d}}`
    },
    required: [true, "Please add a bid end date [must be in the future]"],
    trim: true
  }
});

// Create product slug from the name

ProductSchema.pre("save", function(next) {
  console.log("slugify ran", this.productName);
  this.slug = slugify(this.productName, { lower: true });
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
