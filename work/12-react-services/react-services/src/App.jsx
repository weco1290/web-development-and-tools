import { useEffect, useState } from "react";
import Content from "./Content";
import Login from "./Login";
import "./App.css";
import Error from "./Error.jsx";
import { LOGIN_STATUS } from "./constants.js";
import {
  MESSAGES_TO_USER,
  fetchLogin,
  fetchLogout,
  fetchSession,
  fetchWord,
  updateWord,
} from "./services.js";

function App() {
  const [loginStatus, setLoginstatus] = useState(LOGIN_STATUS.PENDING);
  const [username, setUsername] = useState("");
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [isWordPending, setIsWordPending] = useState(true);

  function onLogin(username) {
    setUsername(username);
    setLoginstatus(LOGIN_STATUS.IS_LOGGED_IN);
    setError("");
    fetchLogin(username)
      .then((response) => {
        setUsername(response.username);
        return fetchWord();
      })
      .catch((error) => {
        if (error?.error === "auth-missing") {
          return Promise.reject({ error: "auth-missing" });
        }
        return Promise.reject(error);
      })
      .then((response) => {
        setWord(response.storeWord);
      })
      .catch((error) => {
        if (error && error.error === "auth-missing") {
          setUsername("");
          setLoginstatus(LOGIN_STATUS.NOT_LOGGED_IN);
        } else {
          setError(MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default);
        }
      });
  }
  function onLogout() {
    setLoginstatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setUsername("");

    setError("");
    fetchLogout().catch((error) => {
      setError(MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default);
    });
  }

  function onUpdateWord(word) {
    setError("");
    setWord(word);
    updateWord(word)
      .then((response) => {
        if (response.username != username) {
          setUsername("");
        }
      })
      .catch((error) => {
        if (error && error.error === "auth-missing") {
          setUsername("");
          setLoginstatus(LOGIN_STATUS.NOT_LOGGED_IN);
        } else {
          setError(MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default);
        }
      });
  }

  function CheckForSession() {
    fetchSession()
      .then((response) => {
        setIsWordPending(false);
        setUsername(response.username);
        setLoginstatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchWord();
      })
      .catch((error) => {
        if (error?.error === "auth-missing") {
          return Promise.reject({ error: "auth-missing" });
        }
        return Promise.reject(error);
      })
      .then((response) => {
        setWord(response.storeWord);
      })
      .catch((error) => {
        if (error && error.error === "auth-missing") {
          setUsername("");
          setLoginstatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default);
      });
  }

  useEffect(() => {
    CheckForSession();
  }, []);

  return (
    <div className="app">
      {error && <Error error={error} />}
      {loginStatus === LOGIN_STATUS.PENDING && <div>Loading...</div>}
      {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
        <Login onLogin={onLogin} />
      )}
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <Content
          username={username}
          onLogout={onLogout}
          onUpdateWord={onUpdateWord}
          word={word}
        />
      )}
    </div>
  );
}
export default App;
