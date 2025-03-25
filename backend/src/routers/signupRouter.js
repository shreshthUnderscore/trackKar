const express = require("express");
const router = express.Router();
const routerController = require("../controllers/singupController");

router.post("/", routerController.signupUser);

module.exports = router;
