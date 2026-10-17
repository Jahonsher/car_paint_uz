import axios from "axios";

const baseURL = (
  process.env.REACT_APP_API_URL || "https://server.carpaint.uz/api/v1"
).replace(/\/+$/, "");

const instance = axios.create({
  baseURL,
});

export default instance;
