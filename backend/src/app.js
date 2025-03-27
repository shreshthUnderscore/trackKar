const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const signupRouter = require("./routes/signupRoute");
const loginRouter = require("./routes/loginRouter");
mongoose.connect("mongodb://127.0.0.1:27017/trackKar");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "cats",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/trackKar",
      collectionName: "sessions",
      autoRemove: "disabled",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  })
);
//add a auth context to the frontend to allow the thingi to stay authenticated
//implement crud features
//look for designs
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ _id: id });
    console.log(user);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use("/sign-up", signupRouter);
app.use("/login", loginRouter);
app.get("check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: {
        id: req.user._id,
        username: req._construct.user.username,
      },
    });
  } else {
    res.json({ isAuthenticated: false });
  }
});

app.listen(3000, () => console.log("app listening on port 3000!"));
