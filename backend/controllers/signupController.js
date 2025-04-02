const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");

async function signUp(req, res) {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

module.exports = {
  signUp,
};
