import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_PATH_API_USERS_BK,
  headers: { "Content-Type": "application/json" },
});