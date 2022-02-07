const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./database/db");

const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

const adminRoute = require("./routes/adminRoute");
app.use("/admin", adminRoute);

const transactionRoute = require("./routes/transactionRoute");
app.use("/user/transaction",transactionRoute);

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.all("*", (req, res) => {
  res.status(404).end("Page not Found");
  //   res.status(404).json({
  //     success: false,
  //     data: "404",
  //   });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
