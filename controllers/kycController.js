const userdetail = require("../models/userDetailsModel");

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

module.exports = {
  kycViewController,
  kycVerifyController,
};
