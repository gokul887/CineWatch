import axios from "axios";

import { serverApiConfig } from "../apiConfig";

const serverAxiosClient = axios.create({
  baseURL: serverApiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    indexes: false,
  },
});

serverAxiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.log(error);
  }
);

export default serverAxiosClient;
