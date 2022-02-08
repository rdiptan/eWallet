const bcryptjs = require("bcryptjs");
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
          res.json({ msg: "Admin Added Successfully", success: true });
        })
        .catch(function (e) {
          res.json({ msg: e, success: false });
        });
    });
  });
};

const getAdminProfileController = (req, res) => {
  admin
    .findById(req.adminInfo._id)
    .select("-password -is_admin -is_active -__v -_id -createdAt")
    .then((admin_data) => {
      res.json({ admin_data, success: true });
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
  admin
    .updateOne({ _id: id }, { fname: fname, lname: lname, image: image }, { new: true })
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

const viewAllAdminsController = (req, res) => {
  admin
    .find({ is_admin: true })
    .select("-password -is_admin -is_active -__v -_id -createdAt")
    .then((admin_data) => {
      res.json({ admin_data, success: true });
    })
    .catch((e) => {
      res.json({ msg: e, success: false });
    });
};

const removeAdminController = (req, res) => {
  const admin_id = req.params.id;
  admin
    .updateOne({ _id: admin_id }, { is_active: false })
    .then(function () {
      res.json({ msg: "Admin Removed Successfully", success: true });
    })
    .catch(function (e) {
      res.json({ msg: e, success: false });
    });
};

module.exports = {
  addAdminController,
  getAdminProfileController,
  updateAdminProfileController,
  viewAllAdminsController,
  removeAdminController,
};
