require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./models/user");
const signupRouter = require("./routers/signupRouter");
const cors = require("cors");

try {
  mongoose.connect(process.env.MONGODB_URL);
} catch (error) {
  console.log(error);
}
app.use(cors());
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/sign-up", signupRouter);

app.listen(process.env.PORT, () => {
  console.log("SERVER RUNNING ON PORT", process.env.PORT);
});
