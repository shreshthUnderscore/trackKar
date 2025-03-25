const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function signupUser(req, res, next) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username: username,
      password: hashedPassword,
    });
    res.status(200);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  signupUser,
};
