import React from "react";
import { useSelector } from "react-redux";
import { tmdbApiConfig } from "../api/apiConfig";
import noImage from "../Images/noImage.jpeg";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { addMovie, removeMovie } from "../util/Util";

const StyledMovie = styled.div`
  width: 275px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .searchpage-m-poster {
    display: grid;
    height: 300px;
    width: 200px;
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;

    &:hover {
      .searchpage-image-overlay {
        button {
          cursor: pointer;
        }
        visibility: visible;
      }
    }
    .searchpage-ind-image {
      grid-row-start: 1;
      grid-row-end: 6;
      grid-column-start: 1;
      grid-column-end: 4;
      background-size: contain;
    }
    .searchpage-image-overlay {
      visibility: hidden;
      display: flex;
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 2;
      flex-direction: column;
      justify-content: space-between;
      button {
        background-color: red;
        border: none;
        padding: 10px;
        color: white;
        border-radius: 5px;
      }
    }
  }
  span {
    padding-top: 10px;
    font-size: 18px;
    color: white;
  }
`;
const Movie = ({ movie }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const isLoggedIn = cookies.userId !== undefined;
  const allMovies = useSelector((state) => state.movies.allMovies);
  const inWatchList = !!allMovies[movie.id];
  const handleAddToWatchListClick = async (e, movie) => {
    e.preventDefault();
    console.log("MOVIE", movie);
    if (inWatchList) {
      await removeMovie(cookies.userId, movie);
    } else {
      await addMovie(cookies.userId, movie);
    }
  };
  return (
    <StyledMovie>
      <div className="searchpage-m-poster">
        <div
          className="searchpage-ind-image"
          style={{
            backgroundImage: `url(${
              movie.poster_path
                ? tmdbApiConfig.w500Image(movie.poster_path)
                : noImage
            })`,
          }}
          alt=""
        />
        <div className="searchpage-image-overlay">
          {isLoggedIn && (
            <button onClick={(e) => handleAddToWatchListClick(e, movie)}>
              {inWatchList ? "Remove" : "Add"}
            </button>
          )}
        </div>
      </div>
      <span>{movie.title || movie.name}</span>
    </StyledMovie>
  );
};

export default Movie;
