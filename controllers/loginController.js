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
          } else {
            return res.json({ msg: "Account Suspended", success: false });
          }

          res.json({ token: token });
        } else if (user_data.is_admin === false) {
          const token = jwt.sign(
            { uid: user_data._id },
            process.env.JWT_SECRET
          );
          res.json({ token: token });
        }
      }
    });
  });
};

module.exports = { loginController };
