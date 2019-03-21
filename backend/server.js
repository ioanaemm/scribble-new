const express = require("express");
const app = express();
const port = process.env.port || 5000;
const bodyParser = require("body-parser");
const mongoose = require("./db");
const apiRouter = require("./routes/api");
const session = require("express-session");
const path = require("path");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use(bodyParser.json({ extended: true }));

app.use("/api", apiRouter);
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
