const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {loginController, changePassword} = require("../controllers/loginController");

router.post("/login", loginController);
router.post("/change-password", (auth.verifyAdmin || auth.verifyUser), changePassword);

module.exports = router;
