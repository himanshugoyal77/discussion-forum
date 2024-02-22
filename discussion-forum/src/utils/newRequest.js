import axios from "axios";

const newRequests = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/`,
  withCredentials: true,
});

export default newRequests;
