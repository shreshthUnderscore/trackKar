require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const { User } = require("./models/user");
const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Initialize database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Your React app URL
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);

// Initialize passport
passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log(username);
    console.log(password);
    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        throw new Error("Username does not exist");
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error("Incorrect Password");
      }

      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  try {
    const user = User.findById(userId);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use(passport.session());

// Routes
app.use("/sign-up", signupRouter);
app.use("/login", loginRouter);

app.listen(process.env.PORT, () => {
  console.log("SERVER RUNNING ON PORT", process.env.PORT);
});
