import { string } from "prop-types";

const express = require("express"); // Import express
const dotenv = require("dotenv"); // Load environment variables from .env file
const morgan = require("morgan"); // Import morgan
const connectDB = require("./config/db"); // Import the database connection

// Load environment variables from .env file
dotenv.config({
  path: "./config/config.env"
});

// Connect to database
connectDB();

// Route Files
const Router = require("./routes/route");

const app = express(); // Create an express app

// Dev Logging Middleware (morgan)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// This is a middleware function that parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json());

//Mount routers
app.use("/e-auction/api/v1/", Router);

const PORT = process.env.PORT || 5000; // 5000 is the default port

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


//export
module.exports = app;
