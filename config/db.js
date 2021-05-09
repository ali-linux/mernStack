const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    console.log("trying to connect to db");
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("db connected...");
  } catch (error) {
    console.log("failed to connect to db");
    console.error(error.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
