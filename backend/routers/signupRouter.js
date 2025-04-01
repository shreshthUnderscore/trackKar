const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  await prisma.user.create({
    body: {
      username: "shreshth",
      password: "123",
    },
  });
});

router.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.status(200).json({ message: allUsers });
  console.log(allUsers);
});

module.exports = router;
