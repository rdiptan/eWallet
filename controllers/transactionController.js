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
    transaction_data
      .save()
      .then(function (result) {
        userdetail
          .findOne({ user: from_id })
          .then(function (from_data) {
            if (from_data.balance < transaction_amount) {
              res.json({ msg: "Insufficient Balance", success: false });
              return;
            }
            from_data.balance = from_data.balance - transaction_amount;
            from_data
              .save()
              .then(function () {
                transaction
                  .findOne({ _id: result._id })
                  .then(function (transaction_data) {
                    transaction_data.debit = true;
                    transaction_data.save();
                  })
                  .catch(function (err) {
                    res.json({ msg: err, success: false });
                  });
                userdetail
                  .findOne({ user: to_id })
                  .then(function (to_data) {
                    to_data.balance = to_data.balance + transaction_amount;
                    to_data
                      .save()
                      .then(function () {
                        transaction
                          .findOne({ _id: result._id })
                          .then(function (transaction_data) {
                            transaction_data.credit = true;
                            transaction_data.save();
                          })
                          .catch(function (err) {
                            res.json({ msg: err, success: false });
                          });
                        res.json({
                          msg: "Transaction Successful",
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
  });
};

const viewTransactionCreditController = (req, res) => {
  const user_id = req.userInfo._id;
  transaction
    .aggregate([
      { $match: { to: user_id } },
      {
        $lookup: {
          from: "users",
          localField: "from",
          foreignField: "_id",
          as: "from_user",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "to",
          foreignField: "_id",
          as: "to_user",
        },
      },
      {
        $project: {
          _id: 1,
          amount: 1,
          category: 1,
          reason: 1,
          transferred_at: 1,
          debit: 1,
          credit: 1,
          __v: 1,
          from: { $arrayElemAt: ["$from_user", 0] },
          to: { $arrayElemAt: ["$to_user", 0] },
        },
      },
    ])
    .then(function (data) {
      if (data.length === 0) {
        res.json({ msg: "No Transaction Found", success: false });
        return;
      }
      res.json({ data, success: true });
    })
    .catch(function (err) {
      res.json({ msg: err, success: false });
    });
};

const viewTransactionDebitController = (req, res) => {
  const user_id = req.userInfo._id;
  transaction
    .aggregate([
      { $match: { from: user_id } },
      {
        $lookup: {
          from: "users",
          localField: "from",
          foreignField: "_id",
          as: "from_user",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "to",
          foreignField: "_id",
          as: "to_user",
        },
      },
      {
        $project: {
          _id: 1,
          amount: 1,
          category: 1,
          reason: 1,
          transferred_at: 1,
          debit: 1,
          credit: 1,
          __v: 1,
          from: { $arrayElemAt: ["$from_user", 0] },
          to: { $arrayElemAt: ["$to_user", 0] },
        },
      },
    ])
    .then(function (data) {
      if (data.length === 0) {
        res.json({ msg: "No Transaction Found", success: false });
        return;
      }
      res.json({ data, success: true });
    })
    .catch(function (err) {
      res.json({ msg: err, success: false });
    });
};

const viewTransactionControllerById = (req, res) => {
  const transaction_id = req.params.id;
  transaction
    .findOne({ _id: transaction_id })
    .populate("from")
    .populate("to")
    .then(function (data) {
      if (data === null) {
        res.json({ msg: "No Transaction Found", success: false });
        return;
      }
      res.json({ data, success: true });
    })
    .catch(function (err) {
      res.json({ msg: err, success: false });
    });
};

const summaryTransactionController = (req, res) => {
  const user_id = req.userInfo._id;
  var name, balance, debit, credit;
  userdetail
    .findOne({user: user_id})
    .populate("user")
    .then(function (data) {
      name = data.user.fname + " " + data.user.lname;
      balance = data.balance;
      transaction
        .find({$and:[{ from: user_id }, { debit: true }, { credit: true }]})
        .then(function (data) {
          debit = data.reduce((acc, cur) => acc + cur.amount, 0);
          transaction
            .find({$and:[{ to: user_id }, { debit: true }, { credit: true }]})
            .then(function (data) {
              credit = data.reduce((acc, cur) => acc + cur.amount, 0);
              data = {
                name: name,
                balance: balance,
                debit: debit,
                credit: credit,
              };
              res.json({
                data,
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
};

module.exports = {
  newTransactionController,
  viewTransactionDebitController,
  viewTransactionCreditController,
  viewTransactionControllerById,
  summaryTransactionController,
};
