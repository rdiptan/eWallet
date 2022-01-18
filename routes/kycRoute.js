const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const uploadDocument = require("../middleware/upload");

const {
  kycUpdateController,
  kycViewController,
  kycVerifyController,
} = require("../controllers/kycController");

router.put(
  "/update",
  uploadDocument.single("document"),
  auth.verifyUser,
  kycUpdateController
);
router.get("/view", auth.verifyAdmin, kycViewController);
router.put("/verify:id", auth.verifyAdmin, kycVerifyController);

module.exports = router;
