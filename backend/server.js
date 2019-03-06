const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const mongoose = require("./db");

const Note = require("./models/note");
const Notebook = require("./models/notebook");

const notebooks = [];
const notes = [];

/*
Notebook
{
  id: String, -> primary key
  title: String,
  tags: String,
  notes: Array[Note]
}

Note
{
  id: String, -> primary key
  title: String,
  body: String,
  notebookId: String, -> foreign key
}


{
  id: "12345",
  title: "blaba",
  tags: "",
  notes: [
    {
      id: "123",
      title: "awesome note"
      body: "dfsgdfsg",
      notebookId: "12345",
    },
    {
      id: "124",
      title: "super note"
      body: "4567uijkhgjyu",
      notebookId: "12345",
    }
  ]
}
*/

app.use(bodyParser.json({ extended: true }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.get("/", (req, res) => res.send("Hello World!"));

/*
  Define how the app responds to a POST requests for the url '/api/notebooks'
*/
app.post("/api/notebooks", async (req, res) => {
  const newNotebook = new Notebook();
  newNotebook.title = req.body.title;
  newNotebook.tags = req.body.tags;
  await newNotebook.save();

  res.status(201);
  res.send(newNotebook);
});

app.get("/api/notebooks", async (req, res) => {
  let notebookList = await Notebook.find()
    .sort({ _id: -1 })
    .skip(1)
    .limit(8);

  res.send(notebookList);
});

app.get("/api/search/:searchTerm", async (req, res) => {
  let notebooks = await Notebook.find({ title: req.params.searchTerm });
  let notes = await Note.find({ title: req.params.searchTerm });
  let dictionary = {
    notebooks,
    notes
  };

  console.log("dictionary", dictionary);
  if (!notebooks && !notes) {
    res.status(404);
    res.send("sorry, we couldn't found what you are looking for");
  } else {
    res.send(dictionary);
  }
});

app.get("/api/notebooks/:id", async (req, res) => {
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

app.post("/api/notes", async (req, res) => {
  const newNote = new Note();
  newNote.title = req.body.title;
  newNote.body = req.body.body;
  newNote.notebookId = req.body.notebookId;

  await newNote.save();
  res.send(newNote);
});

app.get("/api/notes", async (req, res) => {
  let noteList = await Note.find({})
    .sort({ _id: -1 })
    .skip(1)
    .limit(6);
  res.send(noteList);
  console.log("noteList", noteList);
});

app.get("/api/notes/:id", async (req, res) => {
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

app.patch("/api/notes/:id", async (req, res) => {
  let targetNoteId = req.params.id;

  const targetNote = await Note.findById(targetNoteId);

  if (!targetNoteId) {
    res.status(404);
    res.send("note update not found");
  } else {
    for (let key in req.body) {
      targetNote[key] = req.body[key];
    }
    await targetNote.save();
    res.send(targetNote);
  }
});

app.patch("/api/notebooks/:id", async (req, res) => {
  let targetNotebookId = req.params.id;

  notebooks.forEach((notebook, index) => {
    if (notebook.id === targetNotebookId) {
      notebooks[index] = {
        ...notebooks[index],
        ...req.body
      };
    }
  });

  if (!targetNotebookId) {
    res.status(404);
    res.send("notebook update not found");
  } else {
    notebooks["notes"] = notes;
    res.send(notebooks[targetNotebookId]);
  }
});

app.delete("/api/notebooks/:id", async (req, res) => {
  let targetNotebookId = req.params.id;
  const targetNotebook = await Notebook.findByIdAndRemove(
    targetNotebookId,
    (err, notebook) => {
      if (err) return res.status(404).send(err);
    }
  );

  res.send(targetNotebook);
});

app.delete("/api/notes/:id", (req, res) => {
  let targetNoteId = req.params.id;
  for (let i = notes.length - 1; i >= 0; i--) {
    if (notes[i].id === targetNoteId) {
      notes.splice(i, 1);
      break;
    }
  }

  res.send(notes);
});
