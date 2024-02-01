const express = require("express");
const User = require("../models/User.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const router = express.Router();
const jsonParser = bodyParser.json();

const hashPassword = async (password) => {
  return bcrypt
    .genSalt(10)
    .then((salt) => {
      console.log("SALT");
      return bcrypt.hash(password, salt);
    })
    .catch((err) => console.error(err.message));
};
router.post("/", jsonParser, async (req, res) => {
  // console.log(req.body);
  // res.send(req.body);
  const { firstName, lastName, email, password } = req.body;
  const user = await User.findOne({ email: email });
  try {
    if (user) {
      console.log("WG");
      res.status(409);
      res.send({
        message: "An account exists with that email. Please Sign in.",
      });
    } else {
      const hashedPassword = await hashPassword(password);
      console.log(hashedPassword);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      let saveResult = await newUser.save();
      console.log(saveResult);
      res.status(200);
      res.send({
        message: "Success",
      });
    }
  } catch (error) {
    console.log("ERROR");
  }
});

module.exports = router;
