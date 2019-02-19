let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let NotebookSchema = new Schema({
  // generic
  title: String,
  tags: String,
  notes: Array
});

module.exports = mongoose.model("Notebook", NotebookSchema);
