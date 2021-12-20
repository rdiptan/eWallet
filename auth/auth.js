const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

module.exports.verifyUser = (req, res, next) => {
  try {
    token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "anysecretkey");
    console.log(data);
    const userData = user
      .findOne({ _id: data.uid })
      .then(function (result) {
        req.userInfo = result;
        console.log(result);
        next();
      })
      .catch(function (e) {
        res.json({ msg: "Invalid Token", success: false });
      });
  } catch (e) {
    res.json({ msg: "Invalid Token", success: false });
  }
};
