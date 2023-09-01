const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");

// route for creating a playlist
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !songs) {
      return res.status(301).json({ err: "Insufficient data" });
    }

    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser._id,
      collaborators: [],
    };

    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
  }
);

router.get("/get/playlists", async (req, res) => {
  const playlists = await Playlist.find({}).populate({
    path: "songs",
  });

  if (!playlists) {
    return res.status(301).json({ error: "Invalid request" });
  } else return res.status(200).json(playlists);
});

// creating a route to get a playlist using playlistId
router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({ _id: playlistId }).populate({
      path: "songs",
      populate: {
        path: "artist",
      },
    });
    if (!playlist) {
      return res.status(301).json({ err: "Invalid ID" });
    }
    return res.status(200).json(playlist);
  }
);

// Get all the playlists made by me
router.get(
  "/get/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.user._id;

    const playlists = await Playlist.find({ owner: artistId }).populate(
      "owner"
    );
    return res.status(200).json({ data: playlists });
  }
);

// Get all the playlists made by an artist

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.params.artistId;

    // Not validating the artistId as if there is no artist with this id , the response will be an empty array and an empty array would be returned. So there will not be any error in the program.
    // But still
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(304).json({ err: "Invalid Artist Id" });
    }
    const playlists = await Playlist.find({ owner: artistId });
    return res.status(200).json({ data: playlists });
  }
);

// Add a song to a playlist
router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
      return res.status(304).json({ err: "Playlist does not exist" });
    }

    // step1 : check if currentUser owns the playlist or is a collaborator
    if (
      playlist.owner.toString() !== currentUser._id.toString() &&
      !playlist.collaborators.includes(currentUser._id)
    ) {
      return res.status(400).json({ err: "Not allowed" });
    }

    // step2 : check if the song is a valid song
    const song = await Song.findOne({ _id: songId });
    if (!song) {
      return res.status(304).json({ err: "Song does not exist" });
    }

    // step3 : we can now simply add the song to the playlist
    playlist.songs.push(songId);
    await playlist.save();
    return res.status(200).json({ playlist });
  }
);

module.exports = router;
