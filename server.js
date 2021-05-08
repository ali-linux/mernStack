const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 3000;

// CONNECT TO DATABASE
connectDB();

// Init Middlieware
app.use(express.json({ extended: false }), (req, res, next) => {
  console.log("IN SERVER.JS RUNNING BODYPARSER MIDDLEWARE ");
  next();
});

// app.use()
app.get("/", (req, res) => res.send("working"));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

app.listen(port, () => console.log("running on port:", port));
