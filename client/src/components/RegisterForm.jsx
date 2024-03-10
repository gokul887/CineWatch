import React, { useState } from "react";
import "../styles/Forms/Form.css";
import axios from "axios";
// import bcrypt from "bcryptjs";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorState, setErrorState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const validateForm = (isPasswordMatch) => {
    const { firstName, lastName, email, password } = formData;
    let isError = false;
    let newErrorState = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    if (firstName === "") {
      newErrorState.firstName = "Empty Field";
      isError = true;
    }
    if (lastName === "") {
      newErrorState.lastName = "Empty Field";
      isError = true;
    }
    if (email === "") {
      newErrorState.email = "Empty Field";
      isError = true;
    }
    if (password === "") {
      newErrorState.password = "Empty Field";
      isError = true;
    } else if (!isPasswordMatch) {
      newErrorState.password = "Passwords don't match";
      isError = true;
    }
    if (isError) {
      setErrorState(newErrorState);
    } else {
      axios
        .post("http://localhost:5050/signup", formData)
        .then((res) => {
          navigate("/signin");
          toast("Registration successful");
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setErrorState({
              ...newErrorState,
              email: err.response.data.message,
            });
          }
        });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let isPasswordMatch = false;
    if (confirmPassword === formData.password) {
      isPasswordMatch = true;
    }
    validateForm(isPasswordMatch);
  };

  const handleChangeField = (e, field) => {
    if (errorState[field] !== "") {
      setErrorState({ ...errorState, [field]: "" });
    }
    if (field === "password") {
      setFormData({
        ...formData,
        password: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    }
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  return (
    <div className="main">
      <div className="bg" />
      <div className="modal-register">
        <h2 className="sign" align="center">
          Register
        </h2>
        <p className="perks">Get access to movies, watch lists and more</p>
        <form className="form1" onSubmit={handleRegister}>
          <TextField
            type="text"
            className="name"
            placeholder="First Name"
            onChange={(e) => handleChangeField(e, "firstName")}
            variant="standard"
            label={errorState.firstName}
            error={errorState.firstName !== ""}
          />
          <TextField
            type="text"
            className="name"
            placeholder="Last Name"
            onChange={(e) => handleChangeField(e, "lastName")}
            variant="standard"
            label={errorState.lastName}
            error={errorState.lastName !== ""}
          />
          <TextField
            type="email"
            className="name"
            placeholder="Email"
            onChange={(e) => handleChangeField(e, "email")}
            variant="standard"
            label={errorState.email}
            error={errorState.email !== ""}
          />
          <TextField
            className="password"
            type="password"
            placeholder="Password"
            onChange={(e) => handleChangeField(e, "password")}
            variant="standard"
            label={errorState.password}
            error={errorState.password !== ""}
          />
          <TextField
            className="password"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChangeConfirmPassword}
            variant="standard"
            label={errorState.password}
            error={errorState.password !== ""}
          />
          <button type="submit">Sign up</button>
          <p className="links" align="center">
            <a href="/signin">Already have an account? </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
