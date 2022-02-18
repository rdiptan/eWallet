// use the path of your model
const Blog = require("../models/blogModel");
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

describe("Blog Schema test anything", () => {
  // the code below is for get testing

  it("Test for Create Blog", () => {
    const createBlog = {
      title: "This is a first test blog",
      description: "test blog",
      content: "blog content",
    };

    return Blog.create(createBlog).then((res) => {
      expect(res.title).toEqual("This is a first test blog");
    });
  });

  it("Test for Delete Blog", async () => {
    const deleteBlog = await Blog.deleteOne({
      _id: Object("620cfa6cdb7c4648b2180bf2"),
    });
    expect(deleteBlog.ok);
  });

  it("Test for Update Blog", () => {
    return Blog.findOneAndUpdate(
      {
        _id: Object("620cfa6cdb7c4648b2180bf2"),
      },
      {
        $set: {
          content: "This is a first test updated blog",
        },
      }
    ).then((res) => {
      expect(res.content).toEqual("This is a first test updated blog");
    });
  });
});
