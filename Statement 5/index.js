// const e = require("express");
const express = require("express");
const port = 4000;
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://rohitt6202:roku@cluster0.2ahqpxb.mongodb.net/Music?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connected!");
  });

const musicSchema = new mongoose.Schema({
  songname: String,
  filmname: String,
  director: String,
  singer: String,
  actor: String,
  actress: String,
});

const Music = new mongoose.model("Music", musicSchema);

data = [
  {
    songname: "abc",
    filmname: "mov",
    director: "xyz",
    singer: "iua",
    actor: "rohit",
    actress: "ajs",
  },
  {
    songname: "cde",
    filmname: "mod",
    director: "xyq",
    singer: "aas",
    actor: "rahul",
    actress: "fwe",
  },
];

app.get("/add", async (req, res) => {
  try {
    await Music.insertMany(data);
    res.send("Data added successfully");
  } catch (err) {
    console.log(err);
  }
});

app.get("/display", async (req, res) => {
  try {
    const x = await Music.find();
    const count = x.length;
    res.send({ totalCount: count, x: x });
  } catch (err) {
    console.log(err);
  }
});

app.get("/specific", async (req, res) => {
  try {
    const musicobj = await Music.find({ songname: "cde" });
    const names = musicobj.map((student) => {
      //console.log(student.name)
      student.filmname;
    });
    res.send({ musicobj: musicobj });
  } catch (err) {
    console.log(err);
  }
});

app.get("/delete/:songname", async (req, res) => {
  try {
    const { songname } = req.params;
    const delmusic = await Music.findOneAndDelete({ songname: songname });
    if (delmusic) {
      res.send("Deleted");
    } else {
      res.send("Not Deleted");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
