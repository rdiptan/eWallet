const blog = require("../models/blogModel");

const newBlogController = (req, res) => {
  const author_id = req.adminInfo._id;
  const title = req.body.title;
  const description = req.body.description;
  const content = req.body.content;
  const is_published = req.body.is_published;
  const newBlog = new blog({
    author: author_id,
    title: title,
    description: description,
    content: content,
    is_published: is_published,
  });
  newBlog
    .save()
    .then((result) => {
      res.json({
        msg: "Blog created successfully",
        data: result,
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        msg: err,
        success: false,
      });
    });
};

const getBlogController = (req, res) => {
  blog
    .find({ is_published: true })
    .sort({ updated_at: -1 })
    .select("-__v", "-author", "-is_published", "-created_at")
    .then((result) => {
      if (result === null) {
        res.json({
          msg: "No blog found",
          success: false,
        });
        return;
      }
      res.json({
        msg: "Blog list",
        data: result,
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        msg: err,
        success: false,
      });
    });
};

const getBlogByIdController = (req, res) => {
  const blog_id = req.params.id;
  blog
    .findById(blog_id)
    .populate("author")
    .then((result) => {
      res.json({
        msg: "Blog",
        data: result,
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        msg: err,
        success: false,
      });
    });
};

const viewBlogController = (req, res) => {
  blog
    .find({})
    .sort({ updated_at: -1 })
    .populate("author")
    .then((result) => {
      res.json({
        msg: "Blog list",
        data: result,
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        msg: err,
        success: false,
      });
    });
};

const updateBlogController = (req, res) => {
  const blog_id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const content = req.body.content;
  const is_published = req.body.is_published;
  const updated_at = Date.now();
  blog
    .findByIdAndUpdate(
      blog_id,
      {
        title: title,
        description: description,
        content: content,
        is_published: is_published,
        updated_at: updated_at,
      },
      { new: true }
    )
    .then((result) => {
      res.json({
        msg: "Blog updated successfully",
        data: result,
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        msg: err,
        success: false,
      });
    });
};

const deleteBlogController = (req, res) => {
  const blog_id = req.params.id;
  blog
    .findByIdAndDelete(blog_id)
    .then((result) => {
      res.json({
        msg: "Blog deleted successfully",
        data: result,
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        msg: err,
        success: false,
      });
    });
};

module.exports = {
  newBlogController,
  getBlogController,
  viewBlogController,
  getBlogByIdController,
  updateBlogController,
  deleteBlogController,
};
