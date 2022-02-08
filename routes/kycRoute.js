const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {
  kycViewController,
  kycVerifyController,
  unsuccessfulTransactionController,
  addBalanceController,
} = require("../controllers/kycController");

router.get("/view", auth.verifyAdmin, kycViewController);
router.put("/verify:id", auth.verifyAdmin, kycVerifyController);
router.get("/unsuccessful", auth.verifyAdmin, unsuccessfulTransactionController);
router.post("/addBalance", auth.verifyAdmin, addBalanceController);

module.exports = router;
