const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
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

// serve all API requests using this router
app.use("/api", apiRouter);

// serve all static files using the 'static' built-in middleware
app.use(express.static(path.join(__dirname, "public")));

// for all other requests, serve the home page
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
