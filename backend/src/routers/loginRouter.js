const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Login error:", err);
      return next(err);
    }

    if (!user) {
      console.log("Login failed: No user found");
      return res.redirect("/sign-up");
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }
      console.log("User logged in successfully:", user.username);
      return res.redirect("/");
    });
  })(req, res, next);
});

module.exports = router;
