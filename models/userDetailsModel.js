const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./userModel");

const userDetailsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: user,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20,
  },
  address: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  citizenship: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  citizenship_proof: {
    type: String,
  },
  dob: {
    type: Date,
  },
  is_verified: {
    type: Boolean,
    // required: true,
    // default: false,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("userdetails", userDetailsSchema);
