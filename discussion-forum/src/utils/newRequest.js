import axios from "axios";

const newRequests = axios.create({
  baseURL: "http://localhost:8800/api/",
  withCredentials: true,
});

export default newRequests;
