const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admin = require("../models/userModel");

const addAdminController = (req, res) => {
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
};

const adminLoginController = (req, res) => {
  const email = req.body.email;
  user.findOne({ email: email }).then((admin_data) => {
    if (admin_data === null) {
      return res.json({ msg: "Email Not Found", success: false });
    }
    const password = req.body.password;
    bcryptjs.compare(password, user_data.password, (e, result) => {
      if (result === false) {
        return res.json({ msg: "Password Incorrect", success: false });
      }
      const token = jwt.sign({ aid: admin_data._id }, "anysecretkey");
      res.json({ token: token });
    });
  });
};

const getAdminProfileController = (req, res) => {
  user
    .findById(req.adminInfo._id)
    .then((user_data) => {
      res.json({ user_data, success: true });
    })
    .catch((e) => {
      res.json({ msg: e, success: false });
    });
};

const updateAdminProfileController = (req, res) => {
  const id = req.adminInfo._id;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const image = req.file.filename;

  user
    .updateOne({ _id: id }, { fname: fname, lname: lname, image: image })
    .then(function (user_data) {
      res.json({
        user_data,
        msg: "Profile Updated Successfully",
        success: true,
      });
    })
    .catch(function (e) {
      res.json({ msg: e, success: false });
    });
};

module.exports = {
  addAdminController,
  adminLoginController,
  getAdminProfileController,
  updateAdminProfileController,
};
