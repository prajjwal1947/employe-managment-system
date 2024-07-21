import axios from "axios";
import { getToken } from "./AuthService.js";

const BASE_REST_API_URL = "http://localhost:8080/api/employee";

axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getAllEmployees = (all) => axios.get(BASE_REST_API_URL,all);

export const saveEmployee = (employee) => axios.post(BASE_REST_API_URL, employee);

export const getEmployee = (id) => axios.get(BASE_REST_API_URL + "/" + id);

export const updateEmployee = (id, employee) =>
  axios.put(BASE_REST_API_URL + "/update/" + id, employee);

export const deleteEmployee = (id) => axios.delete(BASE_REST_API_URL + "/delete/" + id);
