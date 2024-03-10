import serverAxiosClient from "./serverAxiosClient";

const serverApi = {
  getAllMovies: (userId) => {
    const url = `movies/${userId}/getMovies`;
    return serverAxiosClient.get(url);
  },
  addMovie: (userId, mid) => {
    const url = `movies/${userId}/addMovie`;
    return serverAxiosClient.post(url, { movieId: mid });
  },
  removeMovie: (userId, mid) => {
    const url = `movies/${userId}/removeMovie`;
    return serverAxiosClient.post(url, { movieId: mid });
  },
};

export { serverApi };
