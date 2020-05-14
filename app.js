const express = require("express");
const mongoose = require("mongoose");

const { MONGOURI } = require("./keys");
require("./models/user");
const app = express();
const PORT = 5000;

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("connected database");
});

mongoose.connection.on("error", (err) => {
  console.log("connecting", err);
});

app.get("/", (req, res) => {
  res.send("hello word");
});

app.listen(PORT, () => {
  console.log("server is running", PORT);
});
