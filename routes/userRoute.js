const express = require("express");
const bcryptjs = require("bcryptjs");
const router = new express.Router();
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

module.exports = router;