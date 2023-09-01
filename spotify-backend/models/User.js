const mongoose = require("mongoose");

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  likedSongs: [{ type: mongoose.Types.ObjectId, ref: "Song" }],
  likedPlaylists: [{ type: mongoose.Types.ObjectId, ref: "Playlist" }],
  subscribedArtists: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const UserModel = mongoose.model("User", User);
module.exports = UserModel;
