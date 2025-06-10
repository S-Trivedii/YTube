import axios from "axios";

/*
Every time a request is sent to backend, baseURL will be added in front of route.
For example: if route is '/user/register', the overall route will be 'http://localhost:3000/api/user/register'
*/

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // set once here
});

export default axiosInstance;
