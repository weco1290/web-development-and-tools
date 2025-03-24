const {
  fetchLogin,
  fetchSession,
  MESSAGES_TO_USER,
  fetchLogout,
  fetchAllUsernames,
  fetchMessage,
  updateMessage,
  fetchNewMessages,
} = require("./services");

import { render, updateStoredWords, updateUserLists } from "./view";

import state, {
  login,
  logout,
  setError,
  waitOnLogin,
  waitOnMessages,
} from "./state";

const appEl = document.getElementById("chat-app");
render({ state, appEl });

const lastTimestamp = 0;

function init() {
  fetchSession()
    .then((res) => {
      if (res.username) {
        login(res.username);
        render({ state, appEl });
        return fetchMessage();
      } else {
        throw new Error("auth-missing");
      }
    })
    .then((response) => {
      state.isMessagePending = false;
      state.messages = response.messages;

      render({ state, appEl });
    })
    .catch((error) => {
      if (
        error.message === "auth-missing" ||
        (error && error.error === "auth-missing")
      ) {
        state.username = null;

        logout();
        render({ state, appEl });
      } else {
        state.errorMessage =
          MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default;

        render({ state, appEl });
      }
    });
  fetchAllUsernames()
    .then((response) => {
      state.isUserPending = false;
      const usernames = response.loggedInUsers;
      state.users = Array.from(new Set(usernames)); // Remove duplicates
    })
    .catch((error) => {
      state.errorMessage =
        MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default;
    });
}

init();

// Function to fetch and display usernames
function fetchAndDisplayUsernames() {
  fetchAllUsernames()
    .then((response) => {
      state.isUserPending = false;
      const usernames = response.loggedInUsers;
      state.users = Array.from(new Set(usernames)); // Remove duplicates
    })
    .catch((error) => {
      state.errorMessage =
        MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default;
    });
}

// Function to refresh the home page every 5 seconds
function startAutoRefresh() {
  setInterval(() => {
    if (state.username) {
      fetchMessage()
        .then((response) => {
          state.messages = response.messages;
          updateStoredWords(state.messages);
        })
        .catch((error) => {
          state.errorMessage =
            MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default;
        });
      fetchAllUsernames()
        .then((response) => {
          state.isUserPending = false;
          const usernames = response.loggedInUsers;
          state.users = Array.from(new Set(usernames)); // Remove duplicates

          updateUserLists(state.users);
        })
        .catch((error) => {
          state.errorMessage =
            MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default;
        });
    }
  }, 5000); // 5000 milliseconds = 5 seconds
}

// Function to fetch new messages
function updateNewMessages() {
  fetchNewMessages(lastTimestamp)
    .then((response) => {
      const newMessages = response.newMessages;
      if (newMessages.length > 0) {
        const lastTimestamp = newMessages[newMessages.length - 1].timestamp;
        state.messages = [...state.messages, ...newMessages];
        updateStoredWords(state.messages);
      }
    })
    .catch((error) => {
      state.errorMessage =
        MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default;
    });
}

startAutoRefresh();

document.querySelector("#chat-app").addEventListener("click", function (e) {
  if (e.target.classList.contains("login")) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    waitOnLogin();
    render({ state, appEl });

    fetchLogin(username)
      .then((response) => {
        login(response.username);

        return fetchMessage();
      })
      .then((response) => {
        state.isMessagePending = false;
        state.messages = response.messages;
      })
      .catch((error) => {
        if (error && error.error === "auth-missing") {
          state.isLoginPending = false;
          state.username = "";
        } else {
          state.isLoginPending = false;
          state.errorMessage =
            MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default;
        }
      })
      .finally(() => {
        fetchAndDisplayUsernames();
        render({ state, appEl });
      });
    return;
  }
  if (e.target.classList.contains("update")) {
    e.preventDefault();
    const newMessage = document.getElementById("to-send").value.trim();
    updateMessage(newMessage)
      .then((response) => {
        if (response.username !== state.username) {
          state.username = null;
        } else {
          state.messages = response.messages;
        }
        state.errorMessage = "";
      })
      .catch((error) => {
        if (error && error.error === "auth-missing") {
          state.username = null;
        } else {
          state.errorMessage =
            MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default;
        }
      })
      .finally(() => {
        render({ state, appEl });
      });
  }
  if (e.target.classList.contains("logout")) {
    e.preventDefault();
    logout();
    render({ state, appEl });
    fetchLogout()
      .then((response) => {
        state.username = "";
        state.errorMessage = "";
      })
      .catch((error) => {
        if (error && error.error === "auth-missing") {
          state.username = null;
        } else {
          state.errorMessage =
            MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default;
        }
      })
      .finally(() => {
        fetchAndDisplayUsernames();
        render({ state, appEl });
      });
  }
});
