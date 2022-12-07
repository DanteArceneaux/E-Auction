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
  updateSellerById,
  deleteSellerById
} = require("../controllers/seller.controller");

const {
  getBuyers,
  addBuyer,
  getBuyerById,
  updateBuyerById,
  deleteBuyerById
} = require("../controllers/buyer.controller");

const { getBids, addBid } = require("../controllers/bids.controller.js");

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
router.route("/sellers/update/:id").put(updateSellerById);

//delete a seller by id
router.route("/sellers/delete/:id").delete(deleteSellerById);

//get all buyers
router.route("/buyers").get(getBuyers);

//add a new buyer
router.route("/buyers/add-buyer").post(addBuyer);

//get buyer by ID
router.route("/buyers/:id").get(getBuyerById);

//update buyer by id
router.route("/buyers/update/:id").put(updateBuyerById);

//delete a buyer by id
router.route("/buyers/delete/:id").delete(deleteBuyerById);

//get all bids
router.route("/bids").get(getBids);

//create a new bid
router.route("/bids/add-bid").post(addBid);

module.exports = router; // Export the seller router
