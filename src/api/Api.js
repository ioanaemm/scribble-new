import axios from "axios";
import query from "query-string";

const API_URL = "/api";

export function addNotebook(notebookData) {
  return axios.post(`${API_URL}/notebooks`, notebookData);
}

export function fetchNotebooks({ skip, limit, sort }) {
  let queryString = query.stringify({
    skip,
    limit,
    sort: JSON.stringify(sort)
  });
  console.log("queryString", queryString);
  return axios.get(`${API_URL}/notebooks?${queryString}`);
}

export function fetchNotebook(notebookId) {
  return axios.get(`${API_URL}/notebooks/${notebookId}`);
}

export function addNote(noteData) {
  return axios.post(`${API_URL}/notes`, noteData);
}

export function fetchNotes() {
  return axios.get(`${API_URL}/notes`);
}

export function fetchNote(noteId) {
  return axios.get(`${API_URL}/notes/${noteId}`);
}

export function patchNoteContent(noteId, noteData) {
  // console.log("patchNoteContent");
  return axios.patch(`${API_URL}/notes/${noteId}`, noteData);
}

export function patchNotebookContent(notebookId, notebookData) {
  // console.log("patchNotebookContent");
  return axios.patch(`${API_URL}/notebooks/${notebookId}`, notebookData);
}

export function fetchSearchList(searchTerm) {
  return axios.get(`${API_URL}/search/${searchTerm}`);
}

export function signInUser(userData) {
  return axios.post(`${API_URL}/users/signin`, userData);
}

export function registerUser(userData) {
  return axios.post(`${API_URL}/users/register`, userData);
}

export function fetchUserDetails() {
  return axios.get(`${API_URL}/users/me`);
}

export function deleteNotebook(notebookId) {
  return axios.delete(`${API_URL}/notebooks/${notebookId}`);
}
