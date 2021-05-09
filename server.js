const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

// CONNECT TO DATABASE
connectDB();

// Init Middlieware
app.use(express.json({ extended: false }), (req, res, next) => {
  console.log("IN SERVER.JS RUNNING BODYPARSER MIDDLEWARE ");
  next();
});

//Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log("running on port:", port));
