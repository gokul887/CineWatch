const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  },
  { collection: "users" }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
