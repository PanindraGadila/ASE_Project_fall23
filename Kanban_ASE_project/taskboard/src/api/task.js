import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080/api";

export const getTasks = () => {
  return axios.get("/task");
};

export const createTask = (task) => {
  return axios.post("/task", task);
};

export const updateTask = (task) => {
  return axios.put(`/task/${task.id}`, task);
};

export const deleteTask = (id) => {
  return axios.delete(`/task/${id}`);
};
