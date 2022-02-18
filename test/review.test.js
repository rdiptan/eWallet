// use the path of your model
const Review = require("../models/reviewModel");
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

describe("Review Schema test anything", () => {
  // the code below is for get testing
  it("Test for Create Review", () => {
    const createReview = {
      rating: "5",
      comment: "Great App",
    };

    return Review.create(createReview).then((res) => {
      expect(res.comment).toEqual("Great App");
    });
  });

  it("Test for Delete Review", async () => {
    const deleteReview = await Review.deleteOne({
      _id: Object("620cfa6cdb7c4648b2180bf2"),
    });
    expect(deleteReview.ok);
  });

  it("Test for Update Review", () => {
    return Review.findOneAndUpdate(
      {
        _id: Object("620cfa6cdb7c4648b2180bf2"),
      },
      {
        $set: {
          rating: "2",
        },
      }
    ).then((res) => {
      expect(res.rating).toEqual("2");
    });
  });
});
