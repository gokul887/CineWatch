import queryString from "query-string";
import { tmdbApiConfig } from "../apiConfig";
import tmdbAxiosClient from "./tmdbAxiosClient";

const category = {
  movie: "movie",
  tv: "tv",
};

const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = `movie/${movieType[type]}?api_key=${
      tmdbApiConfig.apiKey
    }&${queryString.stringify(params)}`;
    return tmdbAxiosClient.get(url);
  },
  getSearchMoviesList: (query) => {
    const url = `search/movie?api_key=${
      tmdbApiConfig.apiKey
    }&language=en-US&query=${query.replace(
      " ",
      "%20"
    )}&page=1&include_adult=false`;
    return tmdbAxiosClient.get(url);
  },
  getNowPlayingMovies: () => {
    const url = `movie/now_playing?api_key=${tmdbApiConfig.apiKey}&region=CA`;
    return tmdbAxiosClient.get(url);
  },
  getTvList: (type, params) => {
    const url = `tv/${tvType[type]}?api_key=${
      tmdbApiConfig.apiKey
    }&${queryString.stringify(params)}`;
    return tmdbAxiosClient.get(url, params);
  },
  getSearchTvList: (query) => {
    const url = `search/tv?api_key=${
      tmdbApiConfig.apiKey
    }&language=en-US&query=${query.replace(
      " ",
      "%20"
    )}&page=1&include_adult=false`;
    return tmdbAxiosClient.get(url);
  },
  getVideos: (id) => {
    const url = `movie/${id}/videos?api_key=${tmdbApiConfig.apiKey}&language=en-US`;
    return tmdbAxiosClient.get(url, { params: {} });
  },
  search: (cate, params) => {
    const url = "search/" + category[cate];
    return tmdbAxiosClient.get(url, params);
  },
  detail: (id, params) => {
    const url = `movie/${id}?api_key=${tmdbApiConfig.apiKey}&language=en-US`;
    return tmdbAxiosClient.get(url, params);
  },
  reviews: (id) => {
    const url = `movie/${id}/reviews?api_key=${tmdbApiConfig.apiKey}&language=en-US`;
    return tmdbAxiosClient.get(url, { params: {} });
  },
  credits: (id) => {
    const url = `/movie/${id}/credits?api_key=${tmdbApiConfig.apiKey}&language=en-US`;
    return tmdbAxiosClient.get(url, { params: {} });
  },
  similar: (id) => {
    const url = `/movie/${id}/similar?api_key=${tmdbApiConfig.apiKey}&language=en-US`;
    return tmdbAxiosClient.get(url, { params: {} });
  },
};

export { tmdbApi, category, movieType, tvType };
