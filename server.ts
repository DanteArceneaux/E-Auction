const express = require("express"); // Import express
const dotenv = require("dotenv"); // Load environment variables from .env file
const SellerRouter = require("./routes/seller-route"); // Import the seller route

dotenv.config({
  // Load environment variables from .env file
  path: "./config/config.env"
});

const app = express(); // Create an express app
app.use(express.json()); // This is a middleware function that parses incoming requests with JSON payloads and is based on body-parser.

const PORT = process.env.PORT || 5000; // 5000 is the default port

app.listen(
  // This is the same as app.listen(PORT, () => { ... })
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
 
// Path: routes\seller-route.js
app.use("/e-auction/api/v1/seller", SellerRouter); // This is the same as app.use("/api/sellers", require("./routes/seller-route"));

//export
module.exports = app;
