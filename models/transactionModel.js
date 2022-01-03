const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./userModel");

const transactionSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: user,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: user,
  },
  amount: {
    type: Number,
    required: true,
  },
  transferred_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  category: {
    type: String,
    default: "transfer",
    required: true,
    trim: true,
  },
  reason: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
    maxlength: 100,
  },
});

module.exports = mongoose.model("transaction", transactionSchema);
