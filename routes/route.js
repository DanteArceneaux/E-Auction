const Routes = require("express"); // Import express
const router = Routes.Router(); // Create a router

const {
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

router.route("/seller/add-product").post(addProduct); // This is the same as app.post("/api/sellers/add-product", (req, res) => { ... })

router.route("/seller/delete/:id").get(deleteProductById); // This is the same as app.get("/api/sellers/delete/:id", (req, res) => { ... })

router.route("/buyer").get(getBuyers); // This is the same as app.get("/api/buyers", (req, res) => { ... })

router.route("/buyer/place-bid").post(placeBid); // This is the same as app.post("/api/buyers/place-bid", (req, res) => { ... })

router.route("/buyer/update-bid").put(updateBid); // This is the same as app.post("/api/buyers/update-bid", (req, res) => { ... })

module.exports = router; // Export the seller router
