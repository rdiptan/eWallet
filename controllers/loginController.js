const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

const loginController = (req, res) => {
  const email = req.body.email;
  user.findOne({ email: email }).then((user_data) => {
    if (user_data === null) {
      return res.json({ msg: "Email Not Found", success: false });
    }
    const password = req.body.password;
    bcryptjs.compare(password, user_data.password, (e, result) => {
      if (result === false) {
        return res.json({ msg: "Password Incorrect", success: false });
      } else {
        if (user_data.is_admin === true) {
          if (user_data.is_active === true) {
            const token = jwt.sign(
              { aid: user_data._id },
              process.env.JWT_SECRET
            );
            res.json({ admin_token: token });
          } else {
            return res.json({ msg: "Account Suspended", success: false });
          }
        } else if (user_data.is_admin === false) {
          const token = jwt.sign(
            { uid: user_data._id },
            process.env.JWT_SECRET
          );
          res.json({
            success: true,
            user_token: token,
          });
        }
      }
    });
  });
};

const changePassword = (req, res) => {
  const id = req.adminInfo._id;
  const old_password = req.body.old_password;
  const new_password = req.body.new_password;
  user.findOne({ _id: id }).then((user_data) => {
    const password = user_data.password;
    bcryptjs.compare(old_password, password, (e, result) => {
      if (result === false) {
        return res.json({ msg: "Old Password Incorrect", success: false });
      } else {
        bcryptjs.hash(new_password, 10, (error, hash) => {
          const new_password = hash;
          user.updateOne(
            { _id: id },
            { $set: { password: new_password } },
            (err, result) => {
              if (err) {
                return res.json({
                  msg: "Password Update Failed",
                  success: false,
                });
              }
              return res.json({
                msg: "Password Updated Successfully",
                success: true,
              });
            }
          );
        });
      }
    });
  });
};

module.exports = { loginController, changePassword };
