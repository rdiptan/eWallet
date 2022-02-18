const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {
  newTransactionController,
  viewTransactionDebitController,
  viewTransactionCreditController,
  summaryTransactionController,
  viewTransactionControllerById,
} = require("../controllers/transactionController");

router.post("/new", auth.verifyUser, newTransactionController);
router.get("/view/debit", auth.verifyUser, viewTransactionDebitController);
router.get("/view/credit", auth.verifyUser, viewTransactionCreditController);
router.get("/summary", auth.verifyUser, summaryTransactionController);
router.get("/view/:id", auth.verifyUser, viewTransactionControllerById);

module.exports = router;
