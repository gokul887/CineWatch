import axios from "axios";

import { tmdbApiConfig } from "../apiConfig";

const tmdbAxiosClient = axios.create({
  baseURL: tmdbApiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    indexes: false,
  },
});

tmdbAxiosClient.interceptors.request.use(async (config) => config);

tmdbAxiosClient.interceptors.response.use(
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

export default tmdbAxiosClient;
