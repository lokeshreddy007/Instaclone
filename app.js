const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;

const { MONGOURI } = require("./keys");

require("./models/user");
app.use(express.json());
app.use(require("./routes/auth"));

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("connected database");
});

mongoose.connection.on("error", (err) => {
  console.log("connecting", err);
});

app.listen(PORT, () => {
  console.log("server is running", PORT);
});
