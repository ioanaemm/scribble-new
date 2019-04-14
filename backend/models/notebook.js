let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let NotebookSchema = new Schema({
  // generic
  title: String,
  titleLowercase: String,
  tags: String,
  notes: Array,
  noteCount: Number,
  userId: String
});

module.exports = mongoose.model("Notebook", NotebookSchema);
