const mongoose = require("mongoose");

const user = mongoose.model("user", {
  fname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  is_admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = user;
