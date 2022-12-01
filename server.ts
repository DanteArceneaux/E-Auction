const express = require("express"); // Import express
const dotenv = require("dotenv"); // Load environment variables from .env file
const Router = require("./routes/seller-route"); // Import the seller route
const morgan = require("morgan"); // Import morgan

// Load environment variables from .env file
dotenv.config({
  // Load environment variables from .env file
  path: "./config/config.env"
});

const app = express(); // Create an express app

// Dev Logging Middleware (morgan)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}



app.use(express.json()); // This is a middleware function that parses incoming requests with JSON payloads and is based on body-parser.


const PORT = process.env.PORT || 5000; // 5000 is the default port

app.listen(
  // This is the same as app.listen(PORT, () => { ... })
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Mount routers
app.use("/e-auction/api/v1/sellers", Router); 

//export
module.exports = app;
