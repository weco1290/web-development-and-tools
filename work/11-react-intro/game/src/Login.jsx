// This component has it's OWN state
// Used for "temporary" value, like what we type
import { useState } from "react";

// "loginName" here is NOT the same as "username" in App.jsx
// Even if this was a variable named "username",
// it would be a different variable and different value
// We pass this loginName to the onLogin function we are passed
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
    <>
      <div className="error-message">{errorMessage}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // prevent the form from navigating browser on submit
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
        <button>Login</button>
      </form>
    </>
  );
}

export default Login;
