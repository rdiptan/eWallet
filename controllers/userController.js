const bcryptjs = require("bcryptjs");
const user = require("../models/userModel");
const userdetail = require("../models/userDetailsModel");

const registrationController = (req, res) => {
  const email = req.body.email;
  user.findOne({ email: email }).then(function (data) {
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
        .then(function (result) {
          const userdetailData = new userdetail({
            user: result._id,
          });
          userdetailData
            .save()
            .then(function () {
              res.json({ msg: "User Registered Successfully", success: true });
            })
            .catch(function (e) {
              res.json({ msg: e, success: false });
            });
        })
        .catch(function (e) {
          res.json({ msg: e, success: false });
        });
    });
  });
};

const getprofileController = (req, res) => {
  user
    .findById(req.userInfo._id)
    .select("-password", "-__v", "-_id", "-is_admin")
    .then((user_data) => {
      res.json({ user_data, success: true });
    })
    .catch((e) => {
      res.json({ msg: e, success: false });
    });
};

const updateProfileController = (req, res) => {
  const id = req.userInfo._id;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const url = req.protocol + "://" + req.get("host");
  const image = url + "/images/" + req.file.filename;
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
  registrationController,
  getprofileController,
  updateProfileController,
};
