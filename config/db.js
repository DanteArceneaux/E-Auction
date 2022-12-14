const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log("");
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.brightCyan.bold.underline
    );
  } catch (err) {
    console.error(err.message.red);
    process.exit(1);
  }
};

module.exports = connectDB;
