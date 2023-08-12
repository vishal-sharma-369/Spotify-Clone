const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

// This post route is created to create or register a new user into our application
router.post("/register", async (req, res) => {
  // Our req.body with comprise of email , password, firstName , lastName and the username of the registering user.
  const { email, password, firstName, lastName, username } = req.body;

  // Before creating the new user , we will check if the user with that email id already exists or not.

  const user = await User.findOne({ email: email });

  // If the user with the coming email id already exists, then there is no need to proceed further and we will return back an error with an error code of 403 saying a user already exists with that email id.
  if (user) {
    return res
      .status(403)
      .json({ error: "A user with this email already exists!" });
  }

  //   If the user with the coming email doesn't exists, we will create a new user with that email id.
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUserData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
  };
  const newUser = await User.create(newUserData);

  const token = getToken(email, newUser);

  const userToReturn = { ...newUser.toJSON(), token: token };
  delete userToReturn.password;

  return res.status(200).json(userToReturn);
});

// Writing the code for the login process.
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ error: "Invalid Credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(403).json({ error: "Invalid Credentials" });
  }

  const token = getToken(user.email, user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

module.exports = router;
