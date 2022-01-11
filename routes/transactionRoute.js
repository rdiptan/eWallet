const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const {newTransactionController, viewTransactionController, viewTransactionControllerById} = require("../controllers/transactionController");

router.post("/new", auth.verifyUser, newTransactionController);
router.get("/view", auth.verifyUser, viewTransactionController);
router.get("/view/:id", auth.verifyUser, viewTransactionControllerById);

module.exports = router;
