import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Movie from "./Movie";
import { tmdbApiConfig } from "../api/apiConfig";
import { tmdbApi } from "../api/tmdb/tmdbApi";
import { IoMdClose } from "react-icons/io";

const StyledModalContainer = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(40, 40, 40, 0.9);
  z-index: 2;
  transition: 1s ease;
  .recommendations-modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .recommendations-modal {
      width: 70%;
      height: 80%;
      position: relative;
      background: #141414;
      z-index: 3;
      .recommendations-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .close-icon {
          display: flex;
          justify-content: flex-end;
          button {
            margin: 10px;
            background: red;
            border: none;
            display: flex;
            align-items: center;
            padding: 5px;
            border-radius: 3px;
            svg {
              color: white;
            }
          }
        }
        .recommendations-content-movies {
          max-height: 80%;
          display: flex;
          .recommendation-movies-container {
            max-height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            overflow-y: scroll;
            scrollbar-width: none;
          }
          .recommendation-movies-container::-webkit-scrollbar {
            background: none;
            padding-right: 10px;
            width: 20px;
          }
          .recommendation-movies-container::-webkit-scrollbar-thumb {
            background: white;
            border-radius: 15px;
            background-clip: content-box;
            border: 5px solid transparent;
          }
        }
        span {
          padding: 20px;
          display: block;
          font-weight: 500;
          font-size: 1.5rem;
          color: white;
          text-align: center;
        }
        .original-movie-container {
          display: flex;
          height: 100%;
          align-items: center;
          padding: 20px;
          .original-ind-image {
            height: 400px;
          }
        }
      }
    }
    .red-recommendations-layer {
      background: red;
      width: calc(70% - 30px);
      height: calc(80% - 30px);
      z-index: 2;
      position: absolute;
      top: calc(10% + 40px);
      left: calc(15% + 40px);
    }
  }
`;
const DetailModal = ({ movie, handleModalToggle }) => {
  const [recommendations, setRecommendations] = useState({
    recommendations: [],
    counter: 0,
  });
  useEffect(() => {
    const getRecommendation = async () => {
      let recommendations = await tmdbApi.similar(movie.id);
      return recommendations;
    };
    getRecommendation().then((result) => {
      setRecommendations({
        recommendations: result.results.slice(0, 6),
        counter: 0,
      });
    });
  }, [movie.id]);

  return (
    <StyledModalContainer>
      <div className="recommendations-modal-container">
        <div className="recommendations-modal">
          <div className="recommendations-content">
            <div className="close-icon">
              <button onClick={handleModalToggle}>
                <IoMdClose />
              </button>
            </div>
            <div className="title">
              <span>Movies similar to</span>
            </div>
            <div className="recommendations-content-movies">
              <div className="original-movie-container">
                <img
                  className="original-ind-image"
                  src={tmdbApiConfig.w500Image(movie.poster_path)}
                  alt=""
                />
              </div>
              <div className="recommendation-movies-container">
                {recommendations.recommendations.map((movie) => (
                  <Movie movie={movie} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="red-recommendations-layer" />
      </div>
    </StyledModalContainer>
  );
};

export default DetailModal;
