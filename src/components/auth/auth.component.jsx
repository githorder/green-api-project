/* eslint-disable react/prop-types */

import { useState } from "react";

import { ID_INSTANCE, API_TOKEN_INSTANCE } from "../../constants.js";

import "./auth.style.css";

function Auth({ setUserAccount }) {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (idInstance === ID_INSTANCE && apiTokenInstance === API_TOKEN_INSTANCE) {
      setErrorMessage("");
      setUserAccount({ idInstance, apiTokenInstance });
    } else {
      setErrorMessage("Wrong credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Enter your credentials</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          onChange={(e) => setIdInstance(e.target.value)}
          className="form-input"
          placeholder="idInstance"
          type="text"
        />
        <input
          onChange={(e) => setApiTokenInstance(e.target.value)}
          className="form-input"
          placeholder="apiTokenInstance"
          type="text"
        />
        {errorMessage !== "" ? (
          <span className="error">{errorMessage}</span>
        ) : null}
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

export default Auth;
