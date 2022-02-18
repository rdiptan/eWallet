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

describe("Auth", () => {
  // the code below is for insert testing
  it("Login ", () => {
    const loginController = {
      email: "admin@ewallet.com",
      password: "admin",
    };
    User.findOne(loginController).then((result) => {
      expect(result.email).toEqual("admin@ewallet.com");
    });
  });

  it("Register ", () => {
    const registrationController = {
      email: "test@gmail.com",
      password: "test@123",
      fname: "test",
      lname: "test",
    };
    User.create(registrationController).then((result) => {
      expect(result.email).toEqual("test@gmail.com");
    })
    
  });
});