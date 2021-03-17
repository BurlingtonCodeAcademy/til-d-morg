require("dotenv").config();

const { MongoClient, ObjectId, MongoError } = require("mongodb");
const DataStore = require("./serverDataStore");
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const { urlencoded } = require("express");
const port = process.env.PORT || 5000;
const staticDir = path.resolve("./client/public");


app.use(express.static(staticDir));
app.use(express.urlencoded({ extended: true }));

//DataBase setup
mongoose.connect("mongodb://localhost:27017/fakedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const lessonDB = new DataStore("mongodb://localhost:27017", "fakedb", "posts");

//schema params
const TilSchema = new mongoose.Schema(
  {
    title: String,
    topic: String,
    attachment: String,
    author: String,
    when: Date,
  },
  { versionKey: false }
);

const PostModel = mongoose.model("Post", TilSchema);

//------------------adds post------------------------

app.post("/dashboard", async (req, res) => {
  let newPost = new PostModel({
    title: req.body.title,
    topic: req.body.topic,
    attachment: req.body.attachment,
    author: req.body.author,
  });

  newPost.save((err, data) => {
    if (err) {
      console.log(err);
    } else console.log(success);
  });

  res.redirect("/");
});

//--------------------delete post----------------------//
//------does not work-------//
app.get("/remove/:id"),
  async (req, res) => {
    lessonDB.removeEntry(req.params.id);

    res.redirect("/");
  };

//--------------display single json item by title---------------//
app.get("/showall/:title", async (req, res) => {
  let oneThing = await lessonDB.searchByKey("title", `${req.params.title}`);

  res.json(oneThing);
});

//-----------display single json item by _id-------------------//
app.get("/onepost/:id", async (req, res) => {
  let oneThing = await lessonDB.searchById(req.params.id);

  res.json(oneThing);
});

//--------------show all json items-------------//
app.get("/showall", async (req, res) => {
  let allThings = await lessonDB.getAll();

  res.json(allThings);
});

app.listen(port, () => {
  console.log("Server is live on port:", port, "Yo");
});
