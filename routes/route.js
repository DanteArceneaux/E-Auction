const Routes = require("express"); // Import express
const router = Routes.Router(); // Create a router

const { protect, authorize } = require("../middleware/auth.middleware");

const { getUsers, addUser } = require("../controllers/user.controller");

const {
  updateProductById,
  getProductById,
  getProducts,
  addProduct,
  deleteProductById
} = require("../controllers/product.controller"); // Import the Product controller

const { getBids, addBid } = require("../controllers/bids.controller.js");

/* *** AUTHORIZE MUST GO AFTER PROTECT *** */

//get all products
router.route("/products").get(getProducts);

//add a new product
router
  .route("/products/add-product")
  .post(protect, authorize("seller"), addProduct); // This is the same as app.post("/api/sellers/add-product", (req, res) => { ... })

//delete a product by id
router
  .route("/products/delete/:id")
  .delete(protect, authorize("seller"), deleteProductById);

//get product by ID
router.route("/products/:id").get(getProductById);

//update product by id
router
  .route("/products/update/:id")
  .put(protect, authorize("seller"), updateProductById);

//get all bids
router.route("/bids").get(getBids);

//create a new bid
router.route("/bids/add-bid").post(protect, authorize("buyer"), addBid);

//get all users
router.route("/users").get(getUsers);

//add a new user
router.route("/users/add-user").post(addUser);

module.exports = router; // Export the seller router
