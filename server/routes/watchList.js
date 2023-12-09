const express = require("express");
const movieId = require("../models/Movie.js");
const bodyParser = require("body-parser");
const Movie = require("../models/Movie.js");

const router = express.Router();
const jsonParser = bodyParser.json();

router.get("/:userId/getMovies", jsonParser, async (req, res) => {
  const userId = req.params.userId;
  try {
    const data = await Movie.find({ userId: userId });

    res.status(200);
    res.send({
      message: "Success",
      movies: data,
    });
  } catch (error) {
    console.error("Error adding movies:", error);
    res.status(500);
    res.send({ error: "Internal server error" });
  }
});
router.post("/:userId/addMovie", jsonParser, async (req, res) => {
  const userId = req.params.userId;
  const { movieId } = req.body;
  console.log(movieId);
  try {
    await Movie.create({ userId: userId, movieId: movieId });

    res.status(200);
    res.send({
      message: "Success",
    });
  } catch (error) {
    console.error("Error adding movies:", error);
    res.status(500);
    res.send({ error: "Internal server error" });
  }
});
router.post("/:userId/removeMovie", jsonParser, async (req, res) => {
  const userId = req.params.userId;
  const { movieId } = req.body;

  try {
    const removePromises = Movie.deleteOne({ userId, movieId });

    res.status(200);
    res.send({
      message: "Success",
    });
  } catch (error) {
    console.error("Error removing movies:", error);
    res.status(500);
    res.send({ error: "Internal server error" });
  }
});

module.exports = router;
