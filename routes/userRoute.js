const express = require("express");
const bcryptjs = require("bcryptjs");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const customer = require("../models/userModel");

router.post("/user/registration", (req, res) => {
  const email = req.body.email;
  customer.findOne({ email: email }).then(function (data) {
    if (data != null) {
      res.json({ msg: "Email Already Exists", success: false });
      return;
    }
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    bcryptjs.hash(password, 10, function (e, hashed_password) {
      const userData = new user({
        password: hashed_password,
        email: email,
        fname: fname,
        lname: lname,
      });
      userData
        .save()
        .then(function () {
          res.send({ msg: "User Registered Successfully", success: true });
        })
        .catch(function (e) {
          res.send({ msg: e, success: false });
        });
    });
  });
});

router.post("/user/login", (req, res) => {
  const email = req.body.email;
  user.findOne({ email: email }).then((user_data) => {
    if (user_data === null) {
      return res.json({ msg: "Email Not Found", success: false });
    }
    const password = req.body.password;
    bcryptjs.compare(password, user_data.password, (e, result) => {
      if (result === false) {
        return res.json({ msg: "Password Incorrect", success: false });
      }
      const token = jwt.sign({ uid: user_data._id }, "anysecretkey");
      res.json({ token: token });
    });
  });
});

module.exports = router;
