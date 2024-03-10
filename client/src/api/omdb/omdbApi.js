import axios from "axios";
import { omdbApiConfig } from "../apiConfig";
export const omdbApi = {
  getOmdbData: async (id) => {
    return axios.get(
      `http://www.omdbapi.com/?apiKey=${omdbApiConfig.key}&i=${id}`
    );
  },
};
