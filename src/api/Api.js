import axios from "axios";

const API_URL = "/api";

export function addNotebook(notebookData) {
  return axios.post(`${API_URL}/notebooks`, notebookData);

  // return new Promise((resolve, reject) => {
  //   setTimeout(
  //     () => resolve({ data: { id: Math.floor(Math.random() * 100000) } }),
  //     Math.random() * 500 + 500
  //   );
  // });
}

export function fetchNotebooks() {
  return axios.get(`${API_URL}/notebooks`);
}
