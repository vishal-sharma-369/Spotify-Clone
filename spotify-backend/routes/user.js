const express = require("express");
const User = require("../models/User");
const passport = require("passport");

const router = express.Router();

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.user;
    user.password = ""; // I have used this instead of deleting user.password
    user.likedSongs = user.likedSongs.map((song) => String(song));
    return res.status(200).json(user);
  }
);

module.exports = router;
