const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const mongoose = require("./db");
const notebooksRouter = require("./routes/notebooks");
const notesRouter = require("./routes/notes");
const searchRouter = require("./routes/search");
const userRouter = require("./routes/users");

app.use(bodyParser.json({ extended: true }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/notebooks", notebooksRouter);
app.use("/api/notes", notesRouter);
app.use("/api/search", searchRouter);
app.use("/api/users", userRouter);
