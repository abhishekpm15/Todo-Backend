const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();

const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tn0wwt0.mongodb.net/`
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const dataSchema = new mongoose.Schema({
  item: String,
  strike: Boolean,
});

const model = mongoose.model("todo", dataSchema);

app.post("/items", (req, res) => {
  const data = new model(req.body);
  data
    .save()
    .then((response) => {
      res.send(req.body);
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/get-items", (req, res) => {
  model
    .find()
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/delete-data/:_id", (req, res) => {
  model
    .findByIdAndDelete(req.params._id)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
