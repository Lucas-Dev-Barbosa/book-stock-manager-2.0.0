import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_PATH_API_BK_ESTOQUE,
  headers: { "Content-Type": "application/json" },
});