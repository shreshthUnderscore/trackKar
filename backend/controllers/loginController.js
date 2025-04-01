const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = prisma.user.findUnique({
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

    res.status(200).json({ message: "user logged in" });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
}

module.exports = {
  login,
};
