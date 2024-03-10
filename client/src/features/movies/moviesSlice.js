import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    isLoggedIn: true,
    userId: "655eea878ba16e47126f8bcf",
    isMoviesLoaded: false,
    loadedToWatchMovies: [],
    allMovies: {},
  },
  reducers: {
    setUserId: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload;
    },
    removeUserId: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
    },
    setIsMoviesLoaded: (state) => {
      state.isMoviesLoaded = true;
    },
    setLoadedToWatchMovies: (state, action) => {
      state.loadedToWatchMovies[action.payload.movie] = action.payload.status;
    },
    setMovie: (state, action) => {
      const status = action.payload.status;
      const movie = action.payload.movie;
      if (status === "remove" && state.allMovies[movie.id]) {
        let newState = state.allMovies;
        delete newState[movie.id];
        state.allMovies = newState;
      } else if (status === "add" && !state.allMovies[movie.id]) {
        state.allMovies = {
          ...state.allMovies,
          [movie.id]: movie,
        };
      }
    },
  },
});

export const {
  setUserId,
  removeUserId,
  setIsMoviesLoaded,
  setLoadedToWatchMovies,
  setMovie,
} = moviesSlice.actions;

export default moviesSlice.reducer;
