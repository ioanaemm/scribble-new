import axios from "axios";

const API_URL = "/api";

export function addNotebook(notebookData) {
  return axios.post(`${API_URL}/notebooks`, notebookData);
}

export function fetchNotebooks() {
  return axios.get(`${API_URL}/notebooks`);
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
