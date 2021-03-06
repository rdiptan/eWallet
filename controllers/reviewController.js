const review = require("../models/reviewModel");

writeReviewController = (req, res) => {
  reviewer_id = req.userInfo._id;
  rating = req.body.rating;
  comment = req.body.comment;
  const newReview = new review({
    reviewer: reviewer_id,
    rating: rating,
    comment: comment,
  });
  newReview
    .save()
    .then((result) => {
      res.json({
        result,
        msg: "Review successfully added",
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

getReviewController = (req, res) => {
  review
    .find({ is_published: true })
    .populate("reviewer")
    .sort({ rating: -1 })
    .then((result) => {
      if (result.length === 0) {
        res.json({
          msg: "No review found",
          success: false,
        });
        return;
      }
      res.json({
        result,
        msg: "Reviews successfully fetched",
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

viewReviewController = (req, res) => {
  reviewer_id = req.userInfo._id;
  review
    .findOne({ reviewer: reviewer_id })
    .select("-_id -__v -reviewer -is_published")
    .then((data) => {
      res.json({
        data,
        msg: "Review successfully fetched",
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

updateReviewController = (req, res) => {
  console.log(req.body);
  console.log(req.userInfo);
  console.log(req.headers);
  reviewer_id = req.userInfo._id;
  rating = req.body.rating;
  comment = req.body.comment;
  updated_at = Date.now();
  review
    .findOneAndUpdate(
      { reviewer: reviewer_id },
      {
        $set: { rating: rating, comment: comment, updated_at: updated_at },
      }
    )
    .then((result) => {
      res.json({
        result,
        msg: "Review successfully updated",
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

deleteReviewController = (req, res) => {
  reviewer_id = req.userInfo._id;
  review
    .findOneAndDelete({ reviewer: reviewer_id })
    .then(() => {
      res.json({
        msg: "Review successfully deleted",
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

viewReviewAdminController = (req, res) => {
  review
    .find({})
    .populate("reviewer")
    .sort({ rating: 1 })
    .then((result) => {
      if (result.length === 0) {
        res.json({
          msg: "No review found",
          success: false,
        });
        return;
      }
      res.json({
        result,
        msg: "Reviews successfully fetched",
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

publishReviewController = (req, res) => {
  review_id = req.params.id;
  review
    .findOne({ _id: review_id })
    .then((result) => {
      console.log(result)
      if (result.is_published == true) {
        result.is_published = false;
      } else {
        result.is_published = true;
      }
      result
        .save()
        .then((data) => {
          console.log(data)
          res.json({
            data,
            msg: "Review successfully updated",
            success: true,
          });
        })
        .catch((err) => {
          res.json({
            msg: err,
            success: false,
          });
        });
    })
    .catch((err) => {
      res.json({
        msg: err,
        success: false,
      });
    });
};

deleteReviewAdminController = (req, res) => {
  review_id = req.params.id;
  review
    .findOneAndDelete({ _id: review_id })
    .then(() => {
      res.json({
        msg: "Review successfully deleted",
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
  writeReviewController,
  getReviewController,
  viewReviewController,
  updateReviewController,
  deleteReviewController,
  viewReviewAdminController,
  publishReviewController,
  deleteReviewAdminController,
};
