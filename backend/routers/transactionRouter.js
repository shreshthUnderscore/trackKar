require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../utils/jwtHelper");

router.post("/", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      res.status(403).json({ message: `Not authorized ${err}` });
    } else {
      res.status(200).json({ message: authData });
    }
  });
});

module.exports = router;
