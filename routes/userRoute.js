const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const {
  registrationController,
  getprofileController,
  updateProfileController,
  kycUpdateController,
  kycDataController,
} = require("../controllers/userController");

router.post("/registration", registrationController);
router.get("/profile", auth.verifyUser, getprofileController);
router.put(
  "/profile/update",
  auth.verifyUser,
  upload.single("image"),
  updateProfileController
);
router.put(
  "/kyc/update",
  auth.verifyUser,
  upload.single("document"),
  kycUpdateController
);
router.put("/kyc/data", auth.verifyUser, kycDataController);

module.exports = router;
