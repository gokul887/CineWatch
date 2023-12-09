const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    userId: String,
    movieId: String,
  },
  { collection: "movies" }
);

const Movie = new mongoose.model("Movie", movieSchema);

module.exports = Movie;
