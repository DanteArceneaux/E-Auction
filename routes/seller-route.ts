const sellerRouter = require("express").Router(); // Import express

sellerRouter.get("/", (req, res) => {
  // This is the same as app.get("/api/sellers", (req, res) => { ... })
  res.status(200).json({
    success: true,
    message: "Show all sellers"
});
});


module.exports = sellerRouter; // Export the seller router
