// use the path of your model
const User = require("../models/userModel")
const mongoose = require("mongoose");

// use the new name of the database
const url = "mongodb://localhost:27017/eWallet_test";

beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser:true,
    useUnifiedTopology : true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Testing user Login", () => {
  // the code below is for insert testing
  it("Login ", () => {
    const loginController = {
      email: "admin@ewallet.com",
      password:"admin",
    };
    return User.findOne(loginController).then((result) => {
      expect(result.email).toEqual("");
    });
  });

  it("to test the get User is working or not", async () => {
    const status = await User.find();
    expect(status.ok);
  });
});