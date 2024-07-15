require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParcer = require("cookie-parser");
const routes = require("./routes");

const port = 3001;

const app = express();

app.use(express.static("../frontend/build"));

app.use(cookieParcer());
app.use(express.json());

app.use("/", routes);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server has been started on poort ${port}...`);
  });
});
