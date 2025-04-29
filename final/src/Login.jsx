import React, { useState } from "react";
import { MESSAGES } from "./constants";

const Login = ({ onLogin, navigateTo, error }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(username);
  };

  console.log("login page");

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login to SocialApp</h2>
        {error && (
          <div className="error-message">
            {MESSAGES[error] || MESSAGES.default}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
        <p className="auth-redirect">
          Don't have an account?
          <button className="text-btn" onClick={() => navigateTo("register")}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
