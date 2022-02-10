const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/foodPlaces");
const usersRoutes = require("./routes/users");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/foodPlaces", placesRoutes);
app.use("/api/users", usersRoutes);

app.use(() => {
  throw new HttpError("Can't find this route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(
    "mongodb+srv://gaurav:gaurav31200@cluster0.volbc.mongodb.net/foodPlaces?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
