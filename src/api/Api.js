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
