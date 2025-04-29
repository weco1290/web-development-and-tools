import React, { useState } from "react";
import { MESSAGES } from "./constants";

const Register = ({ onRegister, navigateTo, error }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister(username);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Create SocialApp Account</h2>
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
              placeholder="Choose a username"
            />
          </div>
          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>
        <p className="auth-redirect">
          Already have an account?
          <button className="text-btn" onClick={() => navigateTo("login")}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
