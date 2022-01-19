const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const uploadProfile = require("../middleware/upload");

const {
  registrationController,
  getprofileController,
  updateProfileController,
} = require("../controllers/userController");

router.post("/registration", registrationController);
router.get("/profile", auth.verifyUser, getprofileController);
router.put(
  "/profile/update",
  auth.verifyUser,
  uploadProfile.single("image"),
  updateProfileController
);

module.exports = router;
