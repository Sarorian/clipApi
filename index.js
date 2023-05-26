require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose"),
  Models = require("./models.js"),
  clipData = Models.clipData;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Trying to get squadtage clip data?");
});

app.post("/clips", (req, res) => {
  clipData.findOne({ clipUrl: req.body.clipUrl }).then((clip) => {
    if (clip) {
      return res.status(400).send("This clip is already is in the database");
    } else {
      clipData
        .create({
          clipUrl: req.body.clipUrl,
          name: req.body.name,
          game: req.body.game,
        })
        .then((clip) => {
          res.status(201).json(clip);
        })
        .catch((e) => {
          console.error(e);
          res.status(500).send("Error " + e);
        });
    }
  });
});

app.get("/clips/name/:name", (req, res) => {
  clipData.find({ name: req.params.name }).then((data) => {
    if (data.length === 0) {
      res.status(404).json({
        status: 404,
        data: [],
        message: `No clips from ${req.params.name}`,
      });
    } else {
      res.status(200).json(data);
    }
  });
});

app.get("/clips/game/:game", (req, res) => {
  clipData.find({ game: req.params.game }).then((data) => {
    if (data.length === 0) {
      res.status(404).json({
        status: 404,
        data: [],
        message: `No clips from ${req.params.game}`,
      });
    } else {
      res.status(200).json(data);
    }
  });
});

app.get("/clips/name/:name/:game", (req, res) => {
  clipData
    .find({ game: req.params.game, name: req.params.name })
    .then((data) => {
      if (data.length === 0) {
        res.status(404).json({
          status: 404,
          data: [],
          message: `No ${req.params.game} clips from ${req.params.name} `,
        });
      } else {
        res.status(200).json(data);
      }
    });
});

const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://shamowen5:Mustang6699.@sarorian.wh5lzfz.mongodb.net/squadtageClips?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to database sucesfully");
  } catch (e) {
    console.log(e);
  }
};

connectDB();

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});