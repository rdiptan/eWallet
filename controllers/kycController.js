const user = require("../models/userModel");
const userdetail = require("../models/userDetailsModel");
const transaction = require("../models/transactionModel");

const kycViewController = (req, res) => {
  userdetail
    .find({ is_verified: false })
    .populate("user")
    .then((user_details) => {
      if (user_details === null) {
        res.json({ msg: "All Accounts Verified", success: true });
        return;
      }
      res.json({
        user_details,
        msg: "User Details",
        success: true,
      });
    })
    .catch((e) => {
      res.json({ msg: e, success: false });
    });
};

const kycVerifyController = (req, res) => {
  const id = req.params.id;
  userdetail
    .findOneAndUpdate(
      { _id: id },
      {
        $set: {
          is_verified: true,
        },
      }
    )
    .then((user_details) => {
      res.json({
        user_details,
        msg: "User Verified Successfully",
        success: true,
      });
    })
    .catch((e) => {
      res.json({ msg: e, success: false });
    });
};

const unsuccessfulTransactionController = (req, res) => {
  transaction
    .aggregate([
      { $match: { $or: [{ debit: false }, { credit: false }] } },
      {
        $lookup: {
          from: "users",
          localField: "from",
          foreignField: "_id",
          as: "from_user",
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "to",
          foreignField: "_id",
          as: "to_user",
        }
      },
    ])
    .then(function (data) {
      if (data.length === 0) {
        res.json({ msg: "No Unsuccessful Transaction Found", success: true });
        return;
      }
      res.json({ data, success: true });
    })
    .catch(function (err) {
      res.json({ msg: err, success: false });
    });
};

const addBalanceController = (req, res) => {
  const from_id = req.adminInfo._id;
  const email = req.body.email;
  const transaction_amount = req.body.amount;
  const category = "LOAD FUND";
  const reason = "eWallet";
  user
    .findOne({ email: email })
    .then(function (data) {
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
        debit: true,
      });
      transaction_data
        .save()
        .then(function (result) {
          userdetail
            .findOne({ user: to_id })
            .then(function (to_data) {
              to_data.balance = to_data.balance + transaction_amount;
              to_data
                .save()
                .then(function () {
                  transaction
                    .findOne({ _id: result._id })
                    .then(function (result) {
                      result.credit = true;
                      result.save();
                      res.json({
                        msg: "Fund Added Successfully",
                        success: true,
                      });
                    })
                    .catch(function (err) {
                      res.json({ msg: err, success: false });
                    });
                })
                .catch(function (err) {
                  res.json({ msg: err, success: false });
                });
            })
            .catch(function (err) {
              res.json({ msg: err, success: false });
            });
        })
        .catch(function (err) {
          res.json({ msg: err, success: false });
        });
    })
    .catch(function (err) {
      res.json({ msg: err, success: false });
    });
};

module.exports = {
  kycViewController,
  kycVerifyController,
  unsuccessfulTransactionController,
  addBalanceController,
};
