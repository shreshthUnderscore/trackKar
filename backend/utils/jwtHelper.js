const express = require("express");
const JWT = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    //[Bearer, <our token> ]
    const token = bearer[1];
    req.token = token;

    next();
  } else {
    res.status(403).json({ message: "wrong jwt token" });
  }
}

module.exports = verifyToken;
