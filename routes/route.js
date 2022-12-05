const Routes = require("express"); // Import express
const router = Routes.Router(); // Create a router

const {
  updateProductById,
  getProductById,
  getProducts,
  addProduct,
  deleteProductById
} = require("../controllers/product.controller"); // Import the Product controller

//Import the Sellers controller
const {
  getSellers,
  addSeller,
  getSellerById,
  updateSeller,
  deleteSeller
} = require("../controllers/seller.controller");

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

//get all sellers
router.route("/sellers").get(getSellers);

//add a new seller
router.route("/sellers/add-seller").post(addSeller);

module.exports = router; // Export the seller router
