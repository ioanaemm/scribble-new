let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let NoteSchema = new Schema({
  // generic
  title: String,
  titleLowercase: String,
  body: String,
  notebookId: String
});

module.exports = mongoose.model("Note", NoteSchema);
