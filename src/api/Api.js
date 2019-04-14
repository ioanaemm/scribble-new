import axios from "axios";
import query from "query-string";

const API_URL = "/api";

export function addNotebook(notebookData) {
  return axios.post(`${API_URL}/notebooks`, notebookData);
}

export function fetchNotebooks({
  skip = 0,
  limit = Number.MAX_SAFE_INTEGER,
  sort = { _id: -1 }
}) {
  let queryString = query.stringify({
    skip,
    limit,
    sort: JSON.stringify(sort)
  });
  return axios.get(`${API_URL}/notebooks?${queryString}`).catch(handleError);
}

export function fetchNotebook(notebookId) {
  return axios.get(`${API_URL}/notebooks/${notebookId}`).catch(handleError);
}

export function addNote(noteData) {
  return axios.post(`${API_URL}/notes`, noteData).catch(handleError);
}

export function fetchNotes({
  skip = 0,
  limit = Number.MAX_SAFE_INTEGER,
  sort = { _id: -1 }
}) {
  let queryString = query.stringify({
    skip,
    limit,
    sort: JSON.stringify(sort)
  });
  return axios.get(`${API_URL}/notes?${queryString}`).catch(handleError);
}

export function fetchNote(noteId) {
  return axios.get(`${API_URL}/notes/${noteId}`).catch(handleError);
}

export function patchNoteContent(noteId, noteData) {
  // console.log("patchNoteContent");
  return axios.patch(`${API_URL}/notes/${noteId}`, noteData).catch(handleError);
}

export function patchNotebookContent(notebookId, notebookData) {
  // console.log("patchNotebookContent");
  return axios
    .patch(`${API_URL}/notebooks/${notebookId}`, notebookData)
    .catch(handleError);
}

export function fetchSearchList(searchTerm) {
  return axios.get(`${API_URL}/search/${searchTerm}`).catch(handleError);
}

export function signInUser(userData) {
  return axios.post(`${API_URL}/users/signin`, userData);
}

export function signOutUser() {
  return axios.post(`${API_URL}/users/signout`);
}

export function registerUser(userData) {
  console.log(userData);
  return axios.post(`${API_URL}/users/register`, userData);
}

export function fetchUserDetails() {
  return axios.get(`${API_URL}/users/me`);
}

export function deleteNotebook(notebookId) {
  return axios.delete(`${API_URL}/notebooks/${notebookId}`).catch(handleError);
}

export function verifyAccount(chunk) {
  return axios.post(`${API_URL}/users/verify/${chunk}`);
}

function handleError(e) {
  if (e.response.status === 401) {
    window.location.href = "/login";
  }
  // console.log("error deleting notebook", e);
  // if(e.data)
  // console.log(e.data);
  // window.location.href = "/login";
}
