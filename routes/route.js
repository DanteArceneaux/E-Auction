const Routes = require("express"); // Import express
const router = Routes.Router(); // Create a router

const {
  getSellers,
  addSeller,
  getSellerById,
  updateSeller,
  deleteSeller,
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

//get all sellers
router.route("/sellers").get(getSellers);

//add a new seller
router.route("/sellers/add-seller").post(addSeller);

//get seller by ID
router.route("/sellers/:id").get(getSellerById);

//update seller by id
router.route("/sellers/update/:id").put(updateSeller);

//delete a seller by id
router.route("/sellers/delete/:id").delete(deleteSeller);

module.exports = router; // Export the seller router
