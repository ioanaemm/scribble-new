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

  const updatedNotebook = {
    title: "Hello world 1",
    tags: "#helloworld"
  };
  const patchNotebooksRes = await axios.patch(
    `${API_URL}/notebooks/${postNotebooksRes.data.id}`,
    updatedNotebook
  );

  const getNotebooksRes = await axios.get(
    `${API_URL}/notebooks/${postNotebooksRes.data.id}`
  );
  console.log("postNoteRes before get req", postNoteRes.data);
  // const getNoteRes = await axios.get(`${API_URL}/notes/${postNoteRes.data.id}`);
  // console.log("getNoteRes", getNoteRes);

  // const deleteNotebookRes = await axios.delete(
  //   `${API_URL}/notebooks/${postNotebooksRes.data.id}`
  // );

  const deleteNoteRes = await axios.delete(
    `${API_URL}/notes/postNoteRes.data.id`
  );

  console.log("notes after deletion", deleteNoteRes.data);
  return getNotebooksRes.data;
  // console.log("getNotebooksRes", getNotebooksRes.data);
}

async function test() {
  const response = await callAPI();
  console.log("response", response);
  console.log(
    response.title === "Hello world 1" ? "title is correct" : "title is wrong"
  );
  console.log(
    response.tags === "#helloworld" ? "tag is correct" : "tag is wrong"
  );
  console.log(
    response.notes && response.notes.length === 1
      ? "notebook has a note in it"
      : "notebook has no notes"
  );
  console.log(
    response.notes &&
      response.notes[0] &&
      response.notes[0].title === "React post"
      ? "note has the right title"
      : "note has the wrong title"
  );
}

test();
