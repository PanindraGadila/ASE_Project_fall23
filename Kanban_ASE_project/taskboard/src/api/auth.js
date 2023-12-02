import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080/api";

export const signUp = (user) => {
  return axios.post("/auth/signup", user);
};

export const signIn = (user) => {
  return axios.post("/auth/signin", user);
};

export const signOut = () => {
  return axios.post("/auth/signout");
};

export const getUser = () => {
  return axios.get("/auth/me");
};
