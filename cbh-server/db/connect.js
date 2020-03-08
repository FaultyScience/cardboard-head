const mongoose = require("mongoose");

const dbConnect = async () => {

  try {

    await mongoose.connect("mongodb://localhost/cbh", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to MongoDB...");

  }
  catch (err) {
    console.error("Could not connect to MongoDB...", err);
  }
};

module.exports = dbConnect;
