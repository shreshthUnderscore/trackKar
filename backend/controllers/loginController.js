const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
require("dotenv").config();

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      res.status(404).json({ message: "user does not exist" });
    }

    const match = bcrypt.compare(password, user.password);

    if (!match) {
      res.status(501).json({ message: "Password Does Not Match" });
    }

    JWT.sign(user, process.env.JWT_SECRET, (err, token) => {
      res
        .status(200)
        .json({ message: `user logged in ${token}`, token: token });
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
}

module.exports = {
  login,
};
