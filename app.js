const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./database/db");

const userRoute = require("./routes/userRoute");
app.use(userRoute);

const adminRoute = require("./routes/adminRoute");
app.use(adminRoute);

const transactionRoute = require("./routes/transactionRoute");
app.use(transactionRoute);

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.all("/*", (req, res) => {
  res.status(404).end("Page not Found");
//   res.status(404).json({
//     success: false,
//     data: "404",
//   });
});

app.listen(90);
