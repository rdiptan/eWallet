const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {loginController} = require("../controllers/loginController");

router.post("/login", loginController);

module.exports = router;
