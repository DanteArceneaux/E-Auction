const sellerRouter  = require("express"); // Import express
const router =  sellerRouter.Router(); // Create a router

const {
  getSellers,
  addProduct,
  deleteProductById
} = require("../controllers/seller.controller"); // Import the seller controller

router.route("/").get(getSellers); // This is the same as app.get("/api/sellers", (req, res) => { ... })

router.route("/add-product").post(addProduct); // This is the same as app.post("/api/sellers/add-product", (req, res) => { ... })

router.route("/delete/:id").get(deleteProductById); // This is the same as app.get("/api/sellers/delete/:id", (req, res) => { ... })

module.exports = router; // Export the seller router

