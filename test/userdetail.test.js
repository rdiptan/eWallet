// use the path of your model
const User = require("../models/userModel");
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
describe("Testing user Register", () => {
  // the code below is for insert testing
  it("Register ", () => {
    const registrationController = {
      email: "test@gmail.com",
      password: "test@123",
      fname: "test",
      lname: "test",
    };
    return User.create(registrationController).then((result) => {
      expect(result.email).toEqual("test@gmail.com");
    });
  });

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

  it("to test the get User is working or not", async () => {
    const status = await User.findById("5f4e6b5d6f3b8e0e9c9f9b9f");
    expect(status.ok);
  });

  it("to test the get User is working or not", async () => {
    const status = await User.find();
    expect(status.ok);
  });
});
