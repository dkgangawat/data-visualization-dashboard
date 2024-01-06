const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(
    `${process.env.MONGO_URI}/Dashboard`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
