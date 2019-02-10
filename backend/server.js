const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

// const notebooks = [
//   {
//     id: "12345",
//     title: "blaba",
//     tags: ""
//   }
// ];
// const notes = [

// ];
const notebooks = [];
const notes = [];

function getRandomId() {
  return String(Math.floor(Math.random() * 100000));
}

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
console.log("hellooo");
app.get("/", (req, res) => res.send("Hello World!"));

/*
  Define how the app responds to a POST requests for the url '/api/notebooks'
*/
app.post("/api/notebooks", (req, res) => {
  let newNotebook = { ...req.body, id: getRandomId() };
  notebooks.push(newNotebook);
  res.status = 201;
  res.send(newNotebook);
});

app.get("/api/notebooks", (req, res) => {
  console.log(notebooks);
  res.send(notebooks);
});

app.get("/api/notebooks/:id", (req, res) => {
  let targetNotebookId = req.params.id;
  let targetNotebook = notebooks.filter(notebook => {
    return notebook.id === targetNotebookId;
  })[0];
  console.log(targetNotebook);
  if (!targetNotebook) {
    res.status = 400;
    res.send("notebook not found");
  } else {
    let noteList = notes.filter(note => note.notebookId === targetNotebookId);
    console.log("notes before loop", notes);

    console.log("notes after loop", noteList);
    targetNotebook["notes"] = noteList;
    console.log("targetNotebook", targetNotebook);
    res.send(targetNotebook);
  }
});

app.post("/api/notes", (req, res) => {
  let newNote = { ...req.body, id: getRandomId() };
  notes.push(newNote);
  res.status = 200;
  res.send(newNote);
});

app.get("/api/notes", (req, res) => {
  res.send(notes);
});

app.patch("/api/notes/:id", (req, res) => {
  let targetNoteId = req.params.id;
  notes.forEach(note => {
    if (note.id === targetNoteId) {
      notes[targetNoteId] = { ...notes[targetNoteId], ...req.body };
    }
  });
  console.log("notes after foreach", notes);

  if (!targetNoteId) {
    res.status = 404;
    res.send("note update not found");
  } else {
    res.send(notes[targetNoteId]);
  }
});

app.patch("/api/notebooks/:id", (req, res) => {
  let targetNotebookId = req.params.id;
  notebooks.forEach(notebook => {
    if (notebook.id === targetNotebookId) {
      notebooks[targetNotebookId] = {
        ...notebooks[targetNotebookId],
        ...req.body
      };
    }
  });
  console.log("notebooks updated", notebooks);
  if (!targetNotebookId) {
    res.status = 404;
    res.send("notebook update not found");
  } else {
    notebooks["notes"] = notes;
    res.send(notebooks[targetNotebookId]);
  }
});
