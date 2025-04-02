require("dotenv").config();
const express = require("express");
const router = express.Router();
const controller = require("../controllers/transactionController");
const verifyToken = require("../utils/jwtHelper");

router.post("/", verifyToken, controller.createTransaction);
router.get("/", verifyToken, controller.readTransaction);
router.put("/:id", verifyToken, controller.updateTransaction);
router.delete("/:id", verifyToken, controller.deleteTransaction);

module.exports = router;
