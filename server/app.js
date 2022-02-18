const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const sequelize = require("./utils/database/database");

const app = express();

const secretRoutes = require("./routes/one-time-secret");

app.use("*", function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/one-time-secret", secretRoutes);

const sleep = (timeInMs) =>
  new Promise((resolve) => setTimeout(resolve, timeInMs));

// wait for the database to be up and running
(async () => {
  let isConnected = false;

  while (!isConnected) {
    await sequelize
      .sync()
      .then(() => {
        isConnected = true;
        console.log("Database is up - starting web server at port 8080");
        app.listen(8080);
      })
      .catch(() => {
        console.log("Database is unavailable - sleeping");

        return sleep(1000);
      });
  }
})();
