import axios from "axios";
import { serverApi } from "../api/server/serverApi";
import { tmdbApi } from "../api/tmdb/tmdbApi";
import store from "../app/store";
import { setMovie } from "../features/movies/moviesSlice";
import toast from "react-hot-toast";

const loginRequest = () => {};
const signupRequest = () => {};
const getAllMovies = async (userId) =>
  await axios.get(`http://localhost:5050/movies/${userId}/getMovies`);
const addMovie = async (userId, movie) => {
  console.log("MOVIE 2", movie, movie.id);
  await serverApi.addMovie(userId, movie.id).then((data) => {
    store.dispatch(
      setMovie({
        status: "add",
        movie: movie,
      })
    );
    toast.success("Added to watchlist");
  });
};
const removeMovie = async (userId, movie) => {
  serverApi.removeMovie(userId, movie.id).then((data) => {
    store.dispatch(
      setMovie({
        status: "remove",
        movie: movie,
      })
    );
    toast.success("Removed from watchlist");
  });
};

const handleGetMovies = async (userId) => {
  await serverApi.getAllMovies(userId).then((res) => {
    console.log(res);
    res.movies.forEach((movie) => {
      tmdbApi.detail(movie.movieId).then((res) =>
        store.dispatch(
          setMovie({
            status: "add",
            movie: res,
          })
        )
      );
    });
  });
};

export { handleGetMovies, loginRequest, signupRequest, addMovie, removeMovie };
