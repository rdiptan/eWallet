const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var cors = require("cors");

require("./database/db");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);

  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

const loginRoute = require("./routes/loginRoute");
app.use(loginRoute);

const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

const adminRoute = require("./routes/adminRoute");
app.use("/admin", adminRoute);

const transactionRoute = require("./routes/transactionRoute");
app.use("/transaction", transactionRoute);

const blogRoute = require("./routes/blogRoute");
app.use("/blog", blogRoute);

const reviewRoute = require("./routes/reviewRoute");
app.use("/review", reviewRoute);

const kycRoute = require("./routes/kycRoute");
app.use("/kyc", kycRoute);

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/documents"));

app.all("*", (req, res) => {
  res.status(404).end("Page not Found");
  //   res.status(404).json({
  //     success: false,
  //     data: "404",
  //   });
});

app.use(cors({ origin: true}));
app.options("*", cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
