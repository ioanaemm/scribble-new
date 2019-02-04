const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

const notebooks = [];

app.use(bodyParser.json({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get("/api/notebooks", (req, res) => {
  res.send(notebooks);
});

app.post("/api/notebooks", (req, res) => {
  let newNotebook = { ...req.body, id: Math.floor(Math.random() * 100000) };
  notebooks.push(newNotebook);
  res.send(newNotebook);
});
