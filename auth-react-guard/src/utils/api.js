import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const API = {
  register: (data) => instance.post("/register", data),
  login: (data) => instance.post("/login", data),
  me: () => instance.get("/me"),
  logout: () => instance.post("/logout"),
};

export default API;