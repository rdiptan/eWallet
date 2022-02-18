const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {
  writeReviewController,
  getReviewController,
  viewReviewController,
  updateReviewController,
  deleteReviewController,
  viewReviewAdminController,
  publishReviewController,
  deleteReviewAdminController,
} = require("../controllers/reviewController");

router.post("/write", auth.verifyUser, writeReviewController);
router.get("/get", getReviewController);
router.get("/view", auth.verifyUser, viewReviewController);
router.put("/update", auth.verifyUser, updateReviewController);
router.delete("/delete", auth.verifyUser, deleteReviewController);
router.get("/admin/view", auth.verifyAdmin, viewReviewAdminController);
router.put("/admin/publish/:id", auth.verifyAdmin, publishReviewController);
router.delete("/delete/:id", auth.verifyAdmin, deleteReviewAdminController);

module.exports = router;
