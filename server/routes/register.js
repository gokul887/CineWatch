const express = require("express");
const User = require("../models/User.js");
const bodyParser = require("body-parser");

const router = express.Router();
const jsonParser = bodyParser.json();

router.post("/", jsonParser, async (req, res) => {
  // console.log(req.body);
  // res.send(req.body);
  const { firstName, lastName, email, password } = req.body;
  const user = await User.findOne({ email: email });
  try {
    if (user) {
      res.status(409);
      res.send({
        message: "An account exists with that email. Please Sign in.",
      });
    } else {
      const newUser = new User({ firstName, lastName, email, password });
      let saveResult = await newUser.save();
      console.log(saveResult);
    }
  } catch (error) {
    console.log("ERROR");
  }
});

module.exports = router;
