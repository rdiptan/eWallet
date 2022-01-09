const userdetail = require("../models/userDetailsModel");
const transaction = require("../models/transactionModel");
const user = require("../models/userModel");

const newTransactionController = (req, res) => {
  const from_id = req.userInfo._id;
  const email = req.body.email;
  const transaction_amount = req.body.amount;
  const category = req.body.category;
  const reason = req.body.reason;
  user.findOne({ email: email }).then(function (data) {
    if (data === null) {
      res.json({ msg: "Email Not Found", success: false });
      return;
    }
    const to_id = data._id;
    const transaction_data = new transaction({
      from: from_id,
      to: to_id,
      amount: transaction_amount,
      category: category,
      reason: reason,
    });
    transaction_data.save().then(function () {
      userdetail.findOne({ user: from_id }).then(function (from_data) {
        if (from_data.balance < data.balance) {
          res.json({ msg: "Insufficient Balance", success: false });
          return;
        }
        from_data.balance = data.balance - transaction_amount;
        from_data.save().then(function () {
          userdetail.findOne({ user: to_id }).then(function (to_data) {
            to_data.balance = data.balance + transaction_amount;
            to_data.save().then(function () {
              res.send({ msg: "Transaction Successful", success: true });
            });
          });
        });
      });
    });
  });
};

module.exports = { newTransactionController };
