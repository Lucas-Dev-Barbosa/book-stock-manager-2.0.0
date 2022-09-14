import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_PATH_API_BK_LIVROS,
  headers: { "Content-Type": "application/json" },
});