const axios = require("axios");

let notebook = {
  title: "hello world",
  tags: ""
};

const API_URL = "http://localhost:5000/api";
async function callAPI() {
  const postNotebooksRes = await axios.post(`${API_URL}/notebooks`, notebook);

  let note = {
    title: "React post",
    body: "Lorem ipsum",
    notebookId: postNotebooksRes.data.id
  };
  const postNoteRes = await axios.post(`${API_URL}/notes`, note);

  const getNotebooksRes = await axios.get(
    `${API_URL}/notebooks/${postNotebooksRes.data.id}`
  );
  return getNotebooksRes.data;
  // console.log("getNotebooksRes", getNotebooksRes.data);
}
async function test() {
  const response = await callAPI();
  console.log(
    response.title === "hello world" ? "title is correct" : "title is wrong"
  );
  console.log(
    response.notes.length === 1
      ? "notebook has a note in it"
      : "notebook has no notes"
  );
  console.log(
    response.notes[0].title === "React post"
      ? "note has the right title"
      : "note has the wrong title"
  );
}

test();
