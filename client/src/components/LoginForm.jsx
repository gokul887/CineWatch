import React, { useState } from "react";
import "../styles/Forms/Form.css";
import { TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setMovie, setUserId } from "../features/movies/moviesSlice";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { getAllMovies, handleGetMovies } from "../util/Util";
import { tmdbApi } from "../api/tmdb/tmdbApi";

const LoginForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorState, setErrorState] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    let isError = false;
    let newErrorState = {
      email: "",
      password: "",
    };
    if (email === "") {
      newErrorState.email = "Empty Field";
      isError = true;
    }
    if (password === "") {
      newErrorState.password = "Empty Field";
      isError = true;
    }
    if (isError) {
      setErrorState(newErrorState);
    } else {
      axios
        .post("http://localhost:5050/signin", formData)
        .catch((err) => {
          if (err.response.status === 401) {
            setErrorState({
              ...newErrorState,
              [err.response.data.errorField]: err.response.data.message,
            });
          }
        })
        .then(async (res) => {
          if (res.status === 200) {
            const userId = res.data.userId;
            await handleGetMovies(userId).then(() => {
              setCookie("userId", userId, { maxAge: 3600 });
              navigate("/movies");
            });
          }
        });
    }
  };
  const handleChangeField = (e, field) => {
    if (errorState[field] !== "") {
      setErrorState({ ...errorState, [field]: "" });
    }
    setFormData({ ...formData, [field]: e.target.value });
  };
  return (
    <div className="main">
      <div className="bg" />
      <div className="modal-login">
        <h2 className="sign" align="center">
          Sign in
        </h2>
        <form className="form1">
          <div className="fields">
            <TextField
              type="email"
              className="email"
              placeholder="Email"
              onChange={(e) => handleChangeField(e, "email")}
              variant="standard"
              label={errorState.email}
              error={errorState.email !== ""}
            />
            <TextField
              type="password"
              className="password"
              placeholder="Password"
              onChange={(e) => handleChangeField(e, "password")}
              variant="standard"
              label={errorState.password}
              error={errorState.password !== ""}
            />
          </div>
          <div className="links-div">
            <button onClick={handleSignIn}>Sign in</button>
            <p className="links" align="center">
              <a href="/register">Forgot Password? </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
