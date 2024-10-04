import axios from "axios";

const httpRequest = axios.create({
  baseURL: "http://localhost:8800/api/",
  withCredentials: true,
});

export default httpRequest;