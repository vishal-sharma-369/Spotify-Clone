const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const Song = require("../models/Song");
const User = require("../models/User");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ err: "Insufficient details to create the song." });
    }
    const artist = req.user._id;

    const songDetails = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  }
);

router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const songs = await Song.find({ artist: req.user._id }).populate("artist");
    return res.status(200).json({ data: songs });
  }
);

// Get route to get all  songs any artist has published.
// I will send the artist and i wwant to see all songs that he has published.
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }, async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Artist does not exist" });
    }
    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({ data: songs });
  })
);

// Get route to get a single song by name.
router.get("/get/songname/:songName", async (req, res) => {
  const { songName } = req.params;

  const songs = await Song.find({ name: songName }).populate("artist");
  return res.status(200).json({ data: songs });
});

// PUT route to like a single song
router.put(
  "/like/:songId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let user = req.user;
    const { songId } = req.params;
    if (user) {
      if (!user.likedSongs.includes(songId)) {
        user.likedSongs.push(songId);
        await user.save();
      } else {
        user.likedSongs = user.likedSongs.filter(
          (song) => String(song) !== songId
        );
        await user.save();
      }
    }

    return res.status(201).json({
      message:
        "Successfully updated the entry of song user model liked songs array",
    });
  }
);

module.exports = router;
