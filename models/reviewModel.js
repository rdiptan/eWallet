const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./userModel");

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: user,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    trim: true,
    maxlength: 200,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("review", reviewSchema);
