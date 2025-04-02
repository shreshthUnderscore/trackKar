const { Prisma, PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

async function createTransaction(req, res) {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.status(403).json({ message: `Not authorized ${err}` });
    } else {
      const { amount, type } = req.body;
      const transaction = await prisma.transaction.create({
        data: {
          amount: Number(amount),
          type,
          userId: authData.id,
        },
      });
      res
        .status(200)
        .json({ message: "transaction created successfully", transaction });
    }
  });
}

async function readTransaction(req, res) {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, AuthData) => {
    if (err) {
      res.status(403).json({ message: `Not authorized ${err}` });
    } else {
      const userTransaction = await prisma.transaction.findMany({
        where: {
          userId: AuthData.id,
        },
      });
      res.status(200).json({
        message: "transactions fetched successfully",
        userTransaction,
      });
    }
  });
}

async function updateTransaction(req, res) {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, AuthData) => {
    if (err) {
      res.status(403).json({ message: `Not authorized ${err}` });
    } else {
      console.log(req.params.id);
      const userTransaction = await prisma.transaction.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          amount: Number(req.body.amount),
          type: req.body.type,
        },
      });
      res.status(200).json({
        message: "transaction updated successfully",
        userTransaction,
      });
    }
  });
}

async function deleteTransaction(req, res) {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, AuthData) => {
    if (err) {
      res.status(403).json({ message: `Not authorized ${err}` });
    } else {
      const userTransaction = await prisma.transaction.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json({
        message: "transaction deleted successfully",
        userTransaction,
      });
    }
  });
}

module.exports = {
  createTransaction,
  readTransaction,
  updateTransaction,
  deleteTransaction,
};
