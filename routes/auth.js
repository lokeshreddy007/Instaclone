const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(422).json({ error: "enter all values" });
  }
  //res.json({ message: "Sent data Succesfully" });
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "This email all ready exist" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          name,
          email,
          password: hashedpassword,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please enter password and email" });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invail Email or Password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatach) => {
        if (doMatach) {
          res.json({ message: "Successfully Signin" });
        } else {
          return res.status(422).json({ error: "Invail Email or Password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
module.exports = router;
