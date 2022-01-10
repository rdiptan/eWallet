const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {newTransactionController, viewTransactionController} = require("../controllers/transactionController");

router.post("/user/newtransaction", auth.verifyUser, newTransactionController);
router.get("/user/transactions", auth.verifyUser, viewTransactionController);

module.exports = router;