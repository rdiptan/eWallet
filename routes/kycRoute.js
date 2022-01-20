const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {
  kycViewController,
  kycVerifyController,
} = require("../controllers/kycController");

router.get("/view", auth.verifyAdmin, kycViewController);
router.put("/verify:id", auth.verifyAdmin, kycVerifyController);

module.exports = router;
