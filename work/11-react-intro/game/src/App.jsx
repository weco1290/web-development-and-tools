import { useState } from "react"; // no "path", we're importing from a library

import "./App.css";
import Content from "./Content"; // These have explicit paths, we're importing our own files
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // The below "wrapper" functions make the components less coupled, more reusable
  function onLogin(username) {
    setUsername(username);
    setIsLoggedIn(true);
  }

  function onLogout() {
    setIsLoggedIn(false);
  }

  return (
    <div className="app">
      {isLoggedIn ? (
        <Content username={username} onLogout={onLogout} />
      ) : (
        <Login onLogin={onLogin} />
      )}
    </div>
  );
}

export default App;
