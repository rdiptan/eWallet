const userdetail = require("../models/userDetailsModel");

const kycUpdateController = (req, res) => {
  const user_id = req.UserInfo._id;
  const phone = req.body.phone;
  const address = req.body.address;
  const citizenship = req.body.citizenship;
  const citizenship_proof = req.file.filename;
  const dob = req.body.dob;
  userdetail
    .findOneAndUpdate(
      { user: user_id },
      {
        $set: {
          phone: phone,
          address: address,
          citizenship: citizenship,
          citizenship_proof: citizenship_proof,
          dob: dob,
        },
      }
    )
    .then((user_details) => {
      res.json({
        user_details,
        msg: "User Details Updated Successfully",
        success: true,
      });
    })
    .catch((e) => {
      res.json({ msg: e, success: false });
    });
};

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
  kycUpdateController,
  kycViewController,
  kycVerifyController,
};
