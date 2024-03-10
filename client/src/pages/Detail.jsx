import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { tmdbApiConfig } from "../api/apiConfig";
import { tmdbApi } from "../api/tmdb/tmdbApi";
import { FaPlus } from "react-icons/fa6";
import { IoInformation } from "react-icons/io5";
import styled from "styled-components";
import { useSelector } from "react-redux";
import DetailModal from "../components/DetailModal";
import { useCookies } from "react-cookie";
import { addMovie, removeMovie } from "../util/Util";
import MediaSummary from "../components/MediaSummary";
const StyledDetailContainer = styled.div`
  max-height: ${(props) => (props.isModalOpen ? "90vh" : "")};
  overflow: ${(props) => (props.isModalOpen ? "hidden" : "")};
  .recommend-movie {
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 200px;
    height: 50px;
    background: #17cf9f;
    border: none;
    z-index: 2;
    border-radius: 60px;
    display: flex;
    align-items: center;
    width: auto;
    max-width: 50px;
    -webkit-transition: max-width 0.5s;
    transition: max-width 0.5s;
    &:hover {
      max-width: 220px;
      span {
        display: inline;
      }
    }
    .recommend-movie-icon {
      background: #14b483;
      width: 50px;
      height: 50px;
      display: flex;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      svg {
        height: 30px;
        width: 30px;
      }
    }
    span {
      display: none;
      padding: 5px;
    }
  }
  .detail-backdrop {
    height: 50vh;
    filter: brightness(30%);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .detail-content {
    max-height: 900px;
    display: flex;
    flex-direction: column;
    padding: 40px;
    .details {
      display: flex;
      position: relative;
      bottom: 30vh;
      .w500-img {
        position: relative;
        height: 500px;
        bottom: 5vh;
      }
      .detail-text {
        color: white;
        margin: 50px;

        .add-remove-watchlist {
          margin: 30px 0px;
          button {
            padding: 10px;
            background: #17cf97;
            border: none;
            border-radius: 3px;
            font-size: 16px;
            svg {
              padding-top: 2px;
            }
          }
        }
        h1 {
          font-size: 50px;
        }
        .detail-info {
          .cohere-summary {
            margin-bottom: 50px;
            background: #faaf30;
            color: #000;
            text-align: center;
            padding: 20px;
            border-radius: 30px;
          }
          margin-top: ${(props) => (props.isLoggedIn ? "100px" : "140px")};
          span {
            font-size: 30px;
          }
          p {
            display: block;
            margin: 20px;
          }
          .details-cast {
            display: flex;
            flex-wrap: wrap;
            max-width: 100vw;
            .detail-ind-cast {
              display: flex;
              flex-direction: column;
              width: 135px;
              align-items: center;
              margin: 20px;
              img {
                width: 135px;
                height: 200px;
                border: dashed 0.1px #fe3434;
                border-radius: 10px;
              }
              span {
                margin-top: 10px;
                display: inline-block;
                font-size: 18px;
                text-align: center;
              }
            }
          }
          .details-video-container {
            display: flex;
            flex-direction: column;
            .details-video {
              display: flex;
              margin: 20px;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 1300px) {
    .details {
      .w500-img {
        width: 350px;
      }
      align-items: center;
      flex-direction: column;
      bottom: 40vh !important;
      .detail-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        .details-cast {
          justify-content: center;
        }
        .details-video {
          justify-content: center;
        }
      }
    }
  }
  @media screen and (max-width: 950px) {
    .detail-text {
      .details-video-container {
        display: flex;
        flex-direction: column;
        .details-video {
          iframe {
            width: 500px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 600px) {
    .details-video {
      iframe {
        width: 300px !important;
      }
    }
  }
`;
const Detail = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const isLoggedIn = cookies.userId !== undefined;
  const allMovies = useSelector((state) => state.movies.allMovies);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaDetail, setMediaDetail] = useState(null);
  const [mediaCredit, setMediaCredit] = useState(null);
  const [mediaTrailer, setMediaTrailer] = useState(null);

  useEffect(() => {
    const getMovieDetail = async () => {
      const response = await tmdbApi.detail(id);
      console.log(response.imdb_id);
      setMediaDetail(response);
    };
    const getMovieCredits = async () => {
      try {
        const response = await tmdbApi.credits(id);
        setMediaCredit(response.cast.slice(0, 5));
      } catch (error) {}
    };
    const getTrailerUrl = async () => {
      try {
        const response = await tmdbApi.getVideos(id);
        for (let i = 0; i < response.results.length; i++) {
          const result = response.results[i];
          if (result.site === "YouTube" && result.type === "Trailer") {
            setMediaTrailer(result.key);
            break;
          }
        }
      } catch (error) {}
    };
    getMovieDetail();
    getMovieCredits();
    getTrailerUrl();
  }, [id]);
  const handleWatchlistAction = async (e, inWatchList, movie) => {
    e.preventDefault();
    if (inWatchList) {
      await removeMovie(cookies.userId, movie);
    } else {
      await addMovie(cookies.userId, movie);
    }
  };
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <StyledDetailContainer isModalOpen={isModalOpen} isLoggedIn={isLoggedIn}>
      {id && mediaDetail && mediaCredit && (
        <>
          <button className="recommend-movie" onClick={handleModalToggle}>
            <div className="recommend-movie-icon">
              <IoInformation />
            </div>
            <span>Recommendations</span>
          </button>
          {isModalOpen && (
            <DetailModal
              movie={mediaDetail}
              handleModalToggle={handleModalToggle}
            />
          )}
          <div
            className="detail-backdrop"
            style={{
              backgroundImage: `url(${tmdbApiConfig.originalImage(
                mediaDetail.backdrop_path || mediaDetail.poster_path
              )})`,
            }}
          />
          <div className="detail-content">
            <div className="details">
              <img
                className="w500-img"
                src={tmdbApiConfig.w500Image(mediaDetail.poster_path)}
                alt=""
              />
              <div className="detail-text">
                <h1>{mediaDetail.title}</h1>
                {isLoggedIn && (
                  <div className="add-remove-watchlist">
                    <button
                      onClick={(e) =>
                        handleWatchlistAction(
                          e,
                          !!allMovies[mediaDetail.id],
                          mediaDetail
                        )
                      }
                    >
                      <FaPlus />
                      {!!allMovies[mediaDetail.id]
                        ? "Remove from watchlist"
                        : "Add to watchlist"}
                    </button>
                  </div>
                )}
                <div className="detail-info">
                  <MediaSummary imdb={mediaDetail?.imdb_id} />
                  <span>Release Date: </span>
                  <p>{mediaDetail.release_date}</p>
                  <div className="overview">
                    <span>Overview</span>
                    <p>{mediaDetail.overview}</p>
                  </div>
                  <span>Cast</span>
                  <div className="details-cast">
                    {mediaCredit.map((mc) => (
                      <div className="detail-ind-cast">
                        <img
                          src={tmdbApiConfig.w500Image(mc.profile_path)}
                          alt=""
                        />
                        <span>{mc.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="details-video-container">
                    <span>Trailer</span>
                    <div className="details-video">
                      <iframe
                        width="853"
                        height="480"
                        src={`https://www.youtube.com/embed/${mediaTrailer}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </StyledDetailContainer>
  );
};

export default Detail;
