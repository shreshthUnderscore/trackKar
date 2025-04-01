const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.send(200).json({ message: user });
  } catch (error) {
    res.send(500).json({ message: error });
  }
});

router.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.status(200).json({ message: allUsers });
  console.log(allUsers);
});

module.exports = router;
