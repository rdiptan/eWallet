const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {
  newBlogController,
  getBlogController,
  getBlogByIdController,
  viewBlogAdminController,
  updateBlogController,
  deleteBlogController,
} = require("../controllers/blogController");

router.post("/new", auth.verifyAdmin, newBlogController);
router.get("/view", getBlogController);
router.get("/view/:id", getBlogByIdController);
router.get("/admin/view", auth.verifyAdmin, viewBlogAdminController);
router.put("/update/:id", auth.verifyAdmin, updateBlogController);
router.delete("/delete/:id", auth.verifyAdmin, deleteBlogController);

module.exports = router;
