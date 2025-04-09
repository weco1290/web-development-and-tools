import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [loginName, setLoginName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  function isValid(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    if (!isValid) {
      setErrorMessage("Please enter a valid (letters and/or numbers) username");
    } else if (username.toLowerCase() == "dog") {
      setErrorMessage(`${username} is not a valid user`);
    } else {
      onLogin(loginName);
    }
  }

  return (
    <div className="login-container">
      <div className="error-message">{errorMessage}</div>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          isValid(loginName);
        }}
      >
        <label>
          <span>Username: </span>
          <input
            value={loginName}
            onInput={(e) => setLoginName(e.target.value)}
          />
        </label>
        <button className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
