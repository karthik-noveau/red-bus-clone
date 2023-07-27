import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../home/header";
import { userStore } from "../../store/store";

import "./style.css";

export const Login = () => {
  const addPhno = userStore((state) => state.addPhno);
  const phnoStore = userStore((state) => state.phno);
  const [errorMessage, setErrorMessage] = useState(false);
  const [phno, setPhno] = useState(phnoStore || "");
  const navigate = useNavigate();

  console.log("phno ", phno);
  const key = "updatable";
  const handleInputValue = (e) => {
    let value = e.target.value;
    setPhno(value);
  };

  const handleLogin = () => {
    addPhno(phno);
    if (phno) {
      setErrorMessage(false);
      setTimeout(() => {
        navigate("/");
      }, 300);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <>
      <Header />
      <div className="Login">
        <div className="LoginContainer">
          <img
            src="https://s3.rdbuz.com/Images/webplatform/contextualLogin/desktop-payment-offers.svg"
            alt="login"
          />
          <div className="LoginColumn">
            <div className="image">
              <img src="https://s3.rdbuz.com/Images/logo_r.png" alt="log" />
            </div>
            <p>Sign in to avail exciting discounts and cashbacks!!</p>
            <input
              type="text"
              placeholder="Enter your Mobile Number"
              value={phno}
              onChange={handleInputValue}
            />
            {errorMessage ? (
              <div className="login-errorMessage">
                <p>please enter your phno</p>
              </div>
            ) : (
              ""
            )}
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
};
