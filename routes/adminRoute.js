const express = require("express");
const bcryptjs = require("bcryptjs");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const admin = require("../models/userModel");
const auth = require("../auth/auth");

router.post("/admin/newadmin", auth.verifyAdmin, function(req, res) {
  const email = req.body.email;
  admin.findOne({ email: email }).then(function (data) {
    if (data != null) {
      res.json({ msg: "Email Already Exists", success: false });
      return;
    }
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const is_admin = true;
    bcryptjs.hash(password, 10, function (e, hashed_password) {
      const userData = new user({
        password: hashed_password,
        email: email,
        fname: fname,
        lname: lname,
        is_admin: is_admin,
      });
      userData
        .save()
        .then(function () {
          res.send({ msg: "Admin Added Successfully", success: true });
        })
        .catch(function (e) {
          res.send({ msg: e, success: false });
        });
    });
  });
});

module.exports = router;
