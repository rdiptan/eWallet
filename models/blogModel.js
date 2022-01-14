const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./userModel");

const blogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: user,
  },
  title: {
    type: String,
    trim: true,
    maxlength: 200,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  content: {
    type: String,
    trim: true,
    maxlength: 5000,
  },
  is_published: {
    type: Boolean,
    required: true,
    default: false,
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

module.exports = mongoose.model("blog", blogSchema);
