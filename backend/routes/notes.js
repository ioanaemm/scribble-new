const express = require("express");
const router = express.Router();

const Note = require("../models/note");

router.post("/", async (req, res) => {
  const newNote = new Note();
  newNote.title = req.body.title;
  newNote.titleLowercase = req.body.title.toLowerCase();
  newNote.body = req.body.body;
  newNote.notebookId = req.body.notebookId;

  await newNote.save();
  res.send(newNote);
});

router.get("/", async (req, res) => {
  let noteList = await Note.find({})
    .sort({ _id: -1 })
    .skip(1)
    .limit(6);
  res.send(noteList);
});

router.get("/:id", async (req, res) => {
  let targetNoteId = req.params.id;
  let targetNote = await Note.findById(targetNoteId);

  if (!targetNote) {
    res.status(404);
    res.send("note not found");
  } else {
    res.send(targetNote);
  }
  console.log("response", targetNote);
});

router.patch("/:id", async (req, res) => {
  let targetNoteId = req.params.id;
  // console.log("targetNoteId", targetNoteId);
  const targetNote = await Note.findById(targetNoteId);
  // console.log("targetNote", targetNote);
  if (!targetNoteId) {
    res.status(404);
    res.send("note update not found");
  } else {
    for (let key in req.body) {
      targetNote[key] = req.body[key];
    }
    if (req.body.title) {
      targetNote.titleLowercase = req.body.title.toLowerCase();
    }
    await targetNote.save();
    res.send(targetNote);
  }
});

router.delete("/:id", (req, res) => {
  let targetNoteId = req.params.id;
  for (let i = notes.length - 1; i >= 0; i--) {
    if (notes[i].id === targetNoteId) {
      notes.splice(i, 1);
      break;
    }
  }

  res.send(notes);
});

module.exports = router;
