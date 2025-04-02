const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const controller = require("../controllers/signupController");
router.post("/", controller.signUp);
router.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.status(200).json({ message: allUsers });
  console.log(allUsers);
});

module.exports = router;
