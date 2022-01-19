const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const uploadProfile = require("../middleware/upload");

const {
  addAdminController,
  getAdminProfileController,
  updateAdminProfileController,
} = require("../controllers/adminController");

router.post("/newadmin", auth.verifyAdmin, addAdminController);
router.get("/profile", auth.verifyAdmin, getAdminProfileController);
router.put(
  "/profile/update",
  auth.verifyAdmin,
  uploadProfile.single("image"),
  updateAdminProfileController
);

module.exports = router;
