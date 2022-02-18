// use the path of your model
const Transaction = require("../models/transactionModel");
const mongoose = require("mongoose");
// use the new name of the database
const url = "mongodb://localhost:27017/eWallet_test";

beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe("User Schema test anything", () => {
  // the code below is for get testing
  it("New Transaction ", () => {
    const TransactionController = {
      from: "test@email.com",
      to: "user@email.com",
      amount: 1000,
      reason: "test",
      category: "test",
    };

    Transaction.create(TransactionController).then((result) => {
      expect(result.debit).toEqual(true);
    });
  });

  it("to test the get Transaction is working or not", async () => {
    const status = await Transaction.find({from: "test@email.com"});
    expect(status.ok);
  });
});
