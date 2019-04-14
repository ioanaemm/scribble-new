const express = require("express");
const router = express.Router();

const Note = require("../models/note");
const Notebook = require("../models/notebook");

router.get("/:searchTerm", async (req, res) => {
  let notebooks = await Notebook.find({
    userId: req.session.user._id,
    $or: [
      {
        titleLowercase: {
          $regex: req.params.searchTerm.toLowerCase(),
          $options: "i"
        }
      },
      {
        title: {
          $regex: req.params.searchTerm,
          $options: "i"
        }
      }
    ]
  });
  let notes = await Note.find({
    userId: req.session.user._id,
    $or: [
      {
        titleLowercase: {
          $regex: req.params.searchTerm.toLowerCase(),
          $options: "i"
        }
      },
      {
        title: {
          $regex: req.params.searchTerm,
          $options: "i"
        }
      }
    ]
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
