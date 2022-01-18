const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, "./images");
    } else {
      cb(null, "./documents");
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + file.originalname + Date.now());
  },
});

const filter = function (req, file, cb) {
  if (
    file.mimetype == "images/jpeg" ||
    "images/png" ||
    "images/jpg" ||
    "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filter,
});

module.exports = upload;
