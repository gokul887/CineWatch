import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { tmdbApiConfig } from "../api/apiConfig";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import { useEffect } from "react";

import { tmdbApi } from "../api/tmdb/tmdbApi";
import { useState } from "react";

const StyledCarouselContainer = styled.div`
  display: flex;
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  .swiper-slide {
    display: flex;
    justify-content: center;
    .carousel-content-container {
      height: 100vh;
      width: 100vw;
      background-size: cover;
      background-position: center;
      display: flex;
      position: absolute;
      justify-content: space-around;
      align-items: center;
      filter: brightness(50%);
    }
    .carousel-content {
      align-items: center;
      display: flex;
      color: white;
      filter: brightness(100%);
      @media screen and (max-width: 600px) {
        padding: 50px;
      }
      padding: 100px;
      button {
        margin-top: 20px;
        font-size: 16px;
        background-color: red;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        font-weight: 500;
      }
      .carousel-movie-details {
        margin: 0px 50px;
        .carousel-title {
          font-size: 40px;
          @media screen and (max-width: 500px) {
            font-size: 32px;
          }
          margin-bottom: 20px;
          font-weight: 750;
        }
        .carousel-overview {
          font-size: 20px;
          @media screen and (max-width: 500px) {
            font-size: 16px;
          }
          font-weight: 500;
        }
        .more-info-button {
          display: flex;
        }
      }
      .carousel-content-poster {
        @media screen and (max-width: 850px) {
          display: none;
        }
      }
    }
  }
`;
const Carousel = () => {
  const [movies, setMovies] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await tmdbApi.getNowPlayingMovies();
        setMovies(response.results.slice(0, 5));
      } catch (error) {}
    };
    getMovies();
  }, []);

  const handleMoreInfoClick = (id) => {
    navigate(`/${id}`);
  };

  return (
    <StyledCarouselContainer>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        loop={true}
        className="carousel-mySwiper"
      >
        {movies &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <>
                <div
                  className="carousel-content-container"
                  style={{
                    backgroundImage: `url(${tmdbApiConfig.originalImage(
                      movie.backdrop_path
                    )})`,
                  }}
                />
                <div className="carousel-content">
                  <div className="carousel-movie-details">
                    <h2 className="carousel-title">{movie.title}</h2>
                    <div className="carousel-overview">
                      {window.innerWidth > 1200
                        ? movie.overview
                        : movie.overview.substr(0, 100) + "..."}
                    </div>
                    <div className="more-info-button">
                      <button onClick={() => handleMoreInfoClick(movie.id)}>
                        More info
                      </button>
                    </div>
                  </div>
                  <div className="carousel-content-poster">
                    <img
                      src={tmdbApiConfig.w500Image(movie.poster_path)}
                      alt=""
                    />
                  </div>
                </div>
              </>
            </SwiperSlide>
          ))}
      </Swiper>
    </StyledCarouselContainer>
  );
};

export default Carousel;
