const express = require("express");
const router = express.Router();

const Note = require("../models/note");
const Notebook = require("../models/notebook");

router.get("/:searchTerm", async (req, res) => {
  let notebooks = await Notebook.find({
    titleLowercase: req.params.searchTerm.toLowerCase()
  });
  let notes = await Note.find({
    titleLowercase: req.params.searchTerm.toLowerCase()
  });
  let dictionary = {
    notebooks,
    notes
  };

  if (!notebooks && !notes) {
    res.status(404);
    res.send("sorry, we couldn't found what you are looking for");
  } else {
    res.send(dictionary);
  }
});

module.exports = router;
