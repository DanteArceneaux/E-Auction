const Routes = require("express"); // Import express
const router = Routes.Router(); // Create a router

const { protect, authorize } = require("../middleware/auth.middleware");

// ***** USERS ROUTES *****
const {
  getUsers,
  addUser,
  getUserById,
  deleteUserById
} = require("../controllers/user.controller");

// ***** PRODUCTS ROUTES *****

const {
  updateProductById,
  getProductById,
  getProducts,
  addProduct,
  deleteProductById,
  getProductByProductName
} = require("../controllers/product.controller"); // Import the Product controller

// ***** BIDS ROUTES *****

const {
  getBids,
  addBid,
  getBidByProductName,
  getBidByEmail,
  updateBidAmount,
  deleteBidByEmail
} = require("../controllers/bids.controller.js");

// **** PRODUCTS ROUTES ****

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

//get product by productName
router.route("/products/productName/:productName").get(getProductByProductName);

//update product by id
router
  .route("/products/update/:id")
  .put(protect, authorize("seller"), updateProductById);

// **** BIDS ROUTES ****

//get all bids
router.route("/bids").get(getBids);

//create a new bid
router.route("/bids/add-bid").post(protect, authorize("buyer"), addBid);

//get bid by getBidByEmail
router.route("/bids/email/:email").get(getBidByEmail);

//delete bid by email
router.route("/bids/delete/:email").delete(deleteBidByEmail);

//update bid by productName and email
router.route("/bids/update/:productName/:email").put(updateBidAmount);

// **** USERS ROUTES ****

//get all users
router.route("/users").get(getUsers);

//add a new user
router.route("/users/add-user").post(addUser);

//get user by ID
router.route("/users/:id").get(getUserById);

//delete user by ID
router.route("/users/delete/:id").delete(deleteUserById);

//get bid by productName
router.route("/bids/productName/:productName").get(getBidByProductName);

module.exports = router; // Export the seller router
