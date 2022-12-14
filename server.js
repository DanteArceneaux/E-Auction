const express = require("express"); // Import express
const dotenv = require("dotenv"); // Load environment variables from .env file
const morgan = require("morgan"); // Import morgan
const connectDB = require("./config/db"); // Import the database connection
const colors = require("colors"); // Import morgan
const cookieParser = require("cookie-parser"); // Import cookie-parser
const errorHandler = require("./middleware/error"); // Import the error handler
const auth = require("./routes/auth.route"); // Import the auth route

// Load environment variables from .env file
dotenv.config({
  path: "./config/config.env"
});

// Connect to database
connectDB();

// Route Files
const Router = require("./routes/route");

const app = express(); // Create an express app

//cookie parser
app.use(cookieParser()); // Parse incoming request cookies

// Dev Logging Middleware (morgan)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// This is a middleware function that parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json());

//CORS
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});

//Mount routers

app.use("/e-auction/api/v1/", Router);
app.use("/e-auction/api/v1/auth", auth);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // 5000 is the default port

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(
      `\n Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        .brightBlue.bold
    )
  );
}

//export
module.exports = app;
