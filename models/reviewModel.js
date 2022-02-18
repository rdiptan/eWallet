const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./userModel");

const reviewSchema = new Schema({
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: user,
    unique: true,
    required: true,
  },
  rating: {
    type: String,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
    maxlength: 200,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  is_published: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("review", reviewSchema);
