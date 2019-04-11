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
  return axios.get(`${API_URL}/notebooks?${queryString}`).catch(error => {
    console.log("error fetching notebooks", error);
    window.location.href = "/login";
  });
}

export function fetchNotebook(notebookId) {
  return axios.get(`${API_URL}/notebooks/${notebookId}`).catch(error => {
    console.log("error fetching notebook details", error);
    window.location.href = "/login";
  });
}

export function addNote(noteData) {
  return axios.post(`${API_URL}/notes`, noteData).catch(error => {
    console.log("error adding note", error);
    window.location.href = "/login";
  });
}

export function fetchNotes() {
  return axios.get(`${API_URL}/notes`).catch(error => {
    console.log("error fetching notes", error);
    window.location.href = "/login";
  });
}

export function fetchNote(noteId) {
  return axios.get(`${API_URL}/notes/${noteId}`).catch(error => {
    console.log("error fetching note details", error);
    window.location.href = "/login";
  });
}

export function patchNoteContent(noteId, noteData) {
  // console.log("patchNoteContent");
  return axios.patch(`${API_URL}/notes/${noteId}`, noteData).catch(error => {
    console.log("error updating note details", error);
    window.location.href = "/login";
  });
}

export function patchNotebookContent(notebookId, notebookData) {
  // console.log("patchNotebookContent");
  return axios
    .patch(`${API_URL}/notebooks/${notebookId}`, notebookData)
    .catch(error => {
      console.log("error updating note details", error);
      window.location.href = "/login";
    });
}

export function fetchSearchList(searchTerm) {
  return axios.get(`${API_URL}/search/${searchTerm}`).catch(error => {
    console.log("error fetching notebooks", error);
    window.location.href = "/login";
  });
}

export function signInUser(userData) {
  return axios.post(`${API_URL}/users/signin`, userData);
}

export function signOutUser() {
  return axios.post(`${API_URL}/users/signout`);
}

export function registerUser(userData) {
  return axios.post(`${API_URL}/users/register`, userData);
}

export function fetchUserDetails() {
  return axios.get(`${API_URL}/users/me`);
}

export function deleteNotebook(notebookId) {
  return axios.delete(`${API_URL}/notebooks/${notebookId}`).catch(error => {
    console.log("error deleting notebook", error);
    window.location.href = "/login";
  });
}
