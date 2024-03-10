import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { movieType, tmdbApi } from "../api/tmdb/tmdbApi";
import SearchPage from "../components/SearchPage";

const Movies = () => {
  const [media, setMedia] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const getMovies = async () => {
      try {
        if (searchValue.replace(" ", "") !== "") {
          const response = await tmdbApi.getSearchMoviesList(searchValue);
          setMedia(response.results.slice(0, 18));
        } else {
          const response = await tmdbApi.getMoviesList(movieType.popular, {
            page: 1,
          });
          setMedia(response.results.slice(0, 18));
        }
      } catch (error) {}
    };
    getMovies();
  }, [searchValue]);
  return (
    <SearchPage
      media={media}
      contentType={"Movies"}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    />
  );
};

export default Movies;
