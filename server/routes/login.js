const express = require("express");
const User = require("../models/User.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/", jsonParser, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    console.log(user.id);
    if (bcrypt.compareSync(password, user.password)) {
      res.status(200);
      res.send({ userId: user.id, message: "login success" });
    } else {
      res.status(401);
      res.send({ errorField: "password", message: "wrong password" });
    }
  } else {
    res.status(401);
    res.send({ errorField: "email", message: "no account found" });
  }
});

module.exports = router;
