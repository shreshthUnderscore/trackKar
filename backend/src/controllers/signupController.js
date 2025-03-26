const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function signupUser(req, res) {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(401).json({ message: "user already exists" });
  }
  try {
    await User.create({
      username,
      password: hashedPassword,
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "error while creating user" });
  }

  return res.status(200).json({ message: "user created" });
}

module.exports = { signupUser };
