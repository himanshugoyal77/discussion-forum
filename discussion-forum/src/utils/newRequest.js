import axios from "axios";

const newRequests = axios.create({
  baseURL: "https://discussion-forum-production.up.railway.app/api/",
  withCredentials: true,
});

export default newRequests;
