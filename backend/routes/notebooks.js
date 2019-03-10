const express = require("express");
const router = express.Router();

const Notebook = require("../models/notebook");
const Note = require("../models/note");

/*
  Define how the app responds to a POST requests for the url '/api/notebooks'
*/
router.post("/", async (req, res) => {
  const newNotebook = new Notebook();
  newNotebook.title = req.body.title;
  newNotebook.tags = req.body.tags;
  await newNotebook.save();

  res.status(201);
  res.send(newNotebook);
});

router.get("/", async (req, res) => {
  let notebookList = await Notebook.find()
    .sort({ _id: -1 })
    .skip(1)
    .limit(8);
  await notebookList.forEach(async (notebook, index) => {
    let noteList = await Note.find({ notebookId: notebook._id });
    notebook.noteCount = noteList.length;

    if (index === notebookList.length - 1) {
      res.send(notebookList);
    }
  });
});

router.get("/:id", async (req, res) => {
  let targetNotebookId = req.params.id;
  let targetNotebook = await Notebook.findById(targetNotebookId);

  if (!targetNotebook) {
    res.status(404);
    res.send("notebook not found");
  } else {
    let noteList = await Note.find({ notebookId: targetNotebookId });
    targetNotebook["notes"] = noteList;

    res.send(targetNotebook);
  }
});

router.patch("/:id", async (req, res) => {
  let targetNotebookId = req.params.id;

  let targetNotebook = await Notebook.findById(targetNotebookId);

  if (!targetNotebookId) {
    res.status(404);
    res.send("note update not found");
  } else {
    for (let key in req.body) {
      targetNotebook[key] = req.body[key];
    }
    await targetNotebook.save();
    res.send(targetNotebook);
  }
});

router.delete("/:id", async (req, res) => {
  let targetNotebookId = req.params.id;
  const targetNotebook = await Notebook.findByIdAndRemove(
    targetNotebookId,
    (err, notebook) => {
      if (err) return res.status(404).send(err);
    }
  );

  res.send(targetNotebook);
});

module.exports = router;
