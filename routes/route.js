const Routes = require("express"); // Import express
const router = Routes.Router(); // Create a router

const {
  updateProductById,
  getProductById,
  getProducts,
  addProduct,
  deleteProductById
} = require("../controllers/product.controller"); // Import the seller controller

const {
  getBuyers,
  placeBid,
  updateBid
} = require("../controllers/buyer.controller"); // Import the buyer controller

//get all products
router.route("/products").get(getProducts);

router.route("/products/add-product").post(addProduct); // This is the same as app.post("/api/sellers/add-product", (req, res) => { ... })

//delete a product by id
router.route("/products/delete/:id").delete(deleteProductById);

//get product by ID
router.route("/products/:id").get(getProductById);

//update product by id
router.route("/products/update/:id").put(updateProductById);

module.exports = router; // Export the seller router
