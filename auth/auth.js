const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

module.exports.verifyUser = (req, res, next) => {
  try {
    token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "anysecretkey");
    user.findOne({ $and: [{ _id: data.uid }, { is_admin: false }] })
      .then(function (result) {
        req.userInfo = result;
        next();
      })
      .catch(function (e) {
        res.json({ msg: e, success: false });
      });
  } catch (error) {
    res.json({ msg: "Invalid Token", success: false });
  }
};

module.exports.verifyAdmin = (req, res, next) => {
  try {
    token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "anysecretkey");
    user.findOne({ $and: [{ _id: data.uid }, { is_admin: true }] })
      .then(function (result) {
        req.adminInfo = result;
        next();
      })
      .catch(function (e) {
        res.json({ msg: e, success: false });
      });
  } catch (error) {
    res.json({ msg: "Invalid Token", success: false });
  }
};
