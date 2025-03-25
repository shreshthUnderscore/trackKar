const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

mongoose.connect("mongodb://127.0.0.1:27017/trackKar");

const app = express();

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(express.urlencoded({ extended: false }));
app.use(passport.session());
passport.use(
  new LocalStrategy(async (username, password) => {
    try {
      const user = User.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = User.findOne({ _id: id });
    console.log(user);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

//shift everything to routes and controllers. add bcryptjs package and hash the pass before storing GN
app.get("/register", async (req, res) => {
  const formUsername = req.body.username;
  const formPassword = req.body.password;

  User.create({
    username:
  })

  res.send(user);
});

app.listen(3000, () => console.log("app listening on port 3000!"));
