const express = require("express");
const router = express();
const routerController = require("../controllers/singupController");

router.post("/", routerController.signupUser);

module.exports = router;
