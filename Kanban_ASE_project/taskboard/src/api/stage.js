import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080/api";

export const getStages = () => {
  return axios.get("/stage");
};

export const createStage = (stage) => {
  return axios.post("/stage", stage);
};

export const updateStage = (stage) => {
  return axios.put(`/stage/${stage.id}`, stage);
};

export const deleteStage = (id) => {
  return axios.delete(`/stage/${id}`);
};
