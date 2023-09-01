const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const userRoutes = require("./routes/user");
const cors = require("cors");
app.use(cors());

const dbUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.jwmrw1k.mongodb.net/?retryWrites=true&w=majority`;
const localdb = "mongodb://127.0.0.1/27017";

app.use(express.json());

mongoose
  .connect(localdb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.log("Error while connecting to the database");
    // console.log(error);
  });

// Working with the passport authentications
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.identifier })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      })
      .catch((err) => {
        if (err) {
          return done(err, false);
        }
      });
  })
);

// Working with the apis
app.get("/", (req, res) => {
  res.send("api is working correctly in the background");
});

app.use("/get", userRoutes);
app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

app.listen(5000, () => {
  console.log("App listening on port :", 5000);
});
