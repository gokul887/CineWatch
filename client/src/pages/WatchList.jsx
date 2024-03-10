import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { tmdbApiConfig } from "../api/apiConfig";
import noImage from "../Images/noImage.jpeg";
import { useSelector } from "react-redux";
import Movie from "../components/Movie";

const StyledMainContainer = styled.div`
  button {
    cursor: pointer;
  }
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  .content-container {
    margin-top: 10vh;
    z-index: 1;
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      height: 95%;
      width: 100%;
      border: none;
      display: flex;
      .toggle-button-watch {
        display: flex;
        width: 100%;
        justify-content: center;
        position: relative;
        bottom: 30px;
        .to-watch {
          border-radius: 10px 0px 0px 0px;
          background: black;
        }
        button {
          height: 30px;
          width: 100px;
          background: #17cf97;
          border: none;
          color: white;
        }
      }
      .container {
        padding: 30px;
        display: flex;
        flex-direction: column;
        height: 100%;
        h1 {
          margin-bottom: 50px;
          text-align: center;
          color: white;
        }
        margin-right: 20px;
        width: 100%;
      }
      .recommendation-container {
        background: #cc2d2d;
        border-radius: 10px;
      }
      .movie-container-div {
        display: flex;
        overflow-y: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
        flex-wrap: wrap;
        justify-content: center;
        height: 100%;
      }
      .movie-container-div::-webkit-scrollbar {
        display: none;
      }
      .movie-container-div {
        display: flex;
        overflow-y: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
        flex-wrap: wrap;
      }
      .movie-container-div::-webkit-scrollbar {
        display: none;
      }
      .recommend-icon {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          height: 60px;
          width: 60px;
          z-index: 100;
          color: white;
        }
      }
    }
  }
  .movie {
    .searchpage-ind-m {
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
    }
  }
  .recommendation-container {
    .movie-container-div {
      width: 100%;
      .movie {
        width: 100%;
        a {
          height: 100%;
          width: 100%;
          .searchpage-ind-m {
            height: 80%;
            width: 100%;
            .searchpage-m-poster {
              height: 100%;
              width: 100%;
              transition: width 0.3s, height 0.3s;
              .searchpage-image-overlay {
                display: none;
              }
              display: flex;
              justify-content: center;
              .searchpage-ind-image {
                transition: width 0.3s;
                background-position: center;
                height: 100%;
                width: 100%;
                background-repeat: no-repeat;
              }
            }
          }
        }
      }
    }
  }
  .resize-img {
    height: 100%;
    width: 100%;
    a {
      height: 100%;
      width: 100%;
      .searchpage-ind-m {
        height: 100%;
        width: 100%;
        .searchpage-m-poster {
          height: 100%;
          width: 100%;
          transition: width 0.3s, height 0.3s;
          .searchpage-image-overlay {
            display: none;
          }
          .searchpage-ind-image {
            transition: width 0.3s;
            background-position: center;
            width: 100%;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
  .display-none {
    display: none !important;
  }
`;
const WatchList = () => {
  const [media, setMedia] = useState([]);
  const recRef = useRef(null);
  const [recommendations, setRecommendations] = useState({
    mid: null,
    mName: null,
    recommendations: [],
    counter: 0,
  });
  const currRec = recommendations?.recommendations[recommendations.counter];
  const watchListMovies = useSelector((state) =>
    Object.values(state.movies.allMovies)
  );
  if (recRef) {
    recRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <StyledMainContainer>
      <div className="content-container">
        <div className="content">
          <div
            className={`container movie-container ${
              recommendations.mid ? "half-div" : ""
            }`}
          >
            <h1>Your Watchlist</h1>
            <div className="movie-container-div">
              {watchListMovies.map((movie) => {
                return (
                  <div>
                    <Link to={`/${movie.id}`}>
                      <Movie movie={movie} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          {currRec ? (
            <div
              className={`container recommendation-container half-div ${
                recommendations.mid ? "" : "display-none"
              }`}
            >
              <h1>Similar to:</h1>
              <div className="movie-container-div">
                <div className="movie">
                  <Link to={`/${currRec.id}`}>
                    <div className="searchpage-ind-m">
                      <div className="searchpage-m-poster">
                        <div
                          className="searchpage-ind-image"
                          style={{
                            backgroundImage: `url(${
                              currRec.poster_path
                                ? tmdbApiConfig.w500Image(currRec.poster_path)
                                : noImage
                            })`,
                          }}
                          alt=""
                        />
                        <div className="searchpage-image-overlay">
                          <button>Add to watchlist</button>
                        </div>
                      </div>
                      <span>{currRec.title || currRec.name}</span>
                    </div>
                  </Link>
                  <div className="recommend-another-div">
                    <button className="recommend-another-button">
                      Recommend another
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </StyledMainContainer>
  );
};

export default WatchList;
