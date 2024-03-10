import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header/header.css";
import logo from "../Images/logo.png";
import styled from "styled-components";
import { removeUserId } from "../features/movies/moviesSlice";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { IoMdClose } from "react-icons/io";

const StyledHeaderContainer = styled.header`
  height: 10vh;
  line-height: 10vh;
  z-index: 100;
  max-width: 100vw;
  background-image: linear-gradient(
    to right bottom,
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0)
  );
  color: #fff;
  position: relative;
  width: 100vw;
  .header-container {
    height: 100%;
    nav {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      @media screen and (max-width: 670px) {
        justify-content: space-between;
      }
      .header-logo {
        height: 100%;
        display: inline-block;
        img {
          height: 80%;
          margin-top: 10px;
          margin-left: 50px;
          cursor: pointer;
          @media screen and (max-width: 670px) {
            margin-left: 20px;
          }
        }
      }
      .header-toggle {
        visibility: hidden;
        @media screen and (max-width: 670px) {
          visibility: visible;
          margin-right: 20px;
          padding: 10px 15px;
          height: 50%;
          background-color: red;
          border: none;
          border-radius: 2px;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
`;

const StyledUlContainerMobile = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  opacity: 0.95;
  background: #141414;
  line-height: 40px;
  display: flex;
  align-items: center;
  .close-ham {
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 3px;
    border: none;
    svg {
      height: 15px;
      width: 15px;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    text-align: center;
    a,
    button {
      margin-bottom: 20px;
      font-size: 18px;
    }
    .header-fixed-ul {
      display: flex;
      flex-direction: column;
      a,
      button {
        width: 100px;
        display: inline-block;
        &:hover {
          background-color: red;
          border-radius: 3px;
        }
      }
    }
    .header-resp-ul {
      display: flex;
      flex-direction: column;
      a,
      button {
        width: 100px;
        border: none;
      }
      .red-button {
        display: inline;
        background-color: red;
        border-radius: 5px;
        color: white;
        padding: 5px;
      }
    }
  }
`;

const StyledUlContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin-left: 100px;
  width: 100%;
  @media screen and (max-width: 853px) {
    margin-left: 20px;
  }
  @media screen and (max-width: 670px) {
    display: none;
  }
  .header-fixed-ul {
    a,
    button {
      width: 100px;
      display: inline-block;
      text-align: center;
      &:hover {
        background-color: red;
        border-radius: 3px;
      }
    }
  }
  .header-resp-ul {
    width: 200px;
    height: 100%;
    a,
    button {
      margin-right: 20px;
      border: none;
    }
    .red-button {
      display: inline;
      background-color: red;
      padding: 10px;
      border-radius: 5px;
      color: white;
    }
  }
`;
const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const isLoggedIn = cookies.userId !== undefined;
  const [isHamOpen, setIsHamOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(isHamOpen);

  let resizeWindow = () => {
    console.log(isHamOpen, window.innerWidth);
    if (isHamOpen && window.innerWidth > 670) {
      console.log("WHAT2");
      setIsHamOpen(false);
    }
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, [isHamOpen]);

  const handleSignOutClick = () => {
    handleLinkClick();
    dispatch(removeUserId());
    removeCookie("userId");
  };
  const handleLogoClick = () => {
    handleLinkClick();
    navigate("/");
  };

  const handleLinkClick = () => {
    setIsHamOpen(false);
  };
  const HeaderContents = () => (
    <>
      <div className="header-fixed-ul">
        <Link to="/" onClick={handleLinkClick}>
          Home
        </Link>
        <Link to="/movies" onClick={handleLinkClick}>
          Movies
        </Link>
        {isLoggedIn && (
          <Link to="/watchlist" onClick={handleLinkClick}>
            Watch List
          </Link>
        )}
      </div>
      <div className="header-resp-ul">
        {!isLoggedIn ? (
          <>
            <Link to="/signin" onClick={handleLinkClick}>
              Sign In
            </Link>
            <Link to="/signup" className="red-button" onClick={handleLinkClick}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <button className="red-button" onClick={handleSignOutClick}>
              Sign Out
            </button>
          </>
        )}
      </div>
    </>
  );
  return (
    <>
      <StyledHeaderContainer>
        <div className="header-container">
          <nav>
            <div className="header-logo">
              <img src={logo} alt="" onClick={handleLogoClick} />
            </div>
            <StyledUlContainer>
              <HeaderContents />
            </StyledUlContainer>
            {isHamOpen && (
              <StyledUlContainerMobile>
                <button
                  className="close-ham"
                  onClick={() => setIsHamOpen(false)}
                >
                  <IoMdClose />
                </button>
                <ul>
                  <HeaderContents />
                </ul>
              </StyledUlContainerMobile>
            )}
            <button
              className="header-toggle"
              onClick={() => setIsHamOpen(true)}
            >
              <i className="fa fa-bars" />
            </button>
          </nav>
        </div>
      </StyledHeaderContainer>
    </>
  );
};

export default Header;
