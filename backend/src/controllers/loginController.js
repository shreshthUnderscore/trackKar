const passport = require("passport");

async function login(req, res, next) {
  console.log("Login attempt:", req.body); // Add this line
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(404).json({ message: err });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(404).json({ message: err });
      }
      return res
        .status(200)
        .json({ message: `user ${user.username} logged in` });
    });
  })(req, res, next);
}

module.exports = { login };
