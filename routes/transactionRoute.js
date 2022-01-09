const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {newTransactionController} = require("../controllers/transactionController");

router.post("/user/newtransaction", auth.verifyUser, newTransactionController);

module.exports = router;