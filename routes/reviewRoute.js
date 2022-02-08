const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {
  writeReviewController,
  getReviewController,
  viewReviewController,
  updateReviewController,
  deleteReviewController,
} = require("../controllers/reviewController");

router.post("/write", auth.verifyUser, writeReviewController);
router.get("/get", getReviewController);
router.get("/view", auth.verifyUser, viewReviewController);
router.put("/update", auth.verifyUser, updateReviewController);
router.delete("/delete", auth.verifyUser, deleteReviewController);

module.exports = router;
