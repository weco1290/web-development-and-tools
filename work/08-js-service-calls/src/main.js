const {
  fetchLogin,
  fetchSession,
  fetchWord,
  MESSAGES_TO_USER,
  updateWord,
  fetchLogout,
} = require("./services");

import {
  renderErrorMessageView,
  renderLoginView,
  renderHomePage,
} from "./view";

const state = {
  username: null,
  errorMessage: null,
};

function init() {
  fetchSession()
    .then((res) => {
      if (res.username) {
        state.username = username;
        errorMessage = null;
      }
    })
    .catch((error) => {
      if (error && error.error === "auth-missing") {
        state.username = null;
        renderLoginView();
      } else {
        state.errorMessage =
          MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default;
      }
    })
    .finally(() => {
      render();
    });
}

function render() {
  if (state.errorMessage) {
    renderErrorMessageView(state.errorMessage);
    state.errorMessage = null;
    return;
  }
  if (state.username) {
    fetchWord()
      .then((response) => {
        renderHomePage(response.username, response.storedWord);
      })
      .catch((error) => {
        if (error && error.error === "auth-missing") {
          state.username = null;
          renderLoginView();
        } else {
          state.errorMessage =
            MESSAGES_TO_USER[error.error] || MESSAGES_TO_USER.default;
          renderErrorMessageView();
        }
      });
  } else {
    renderLoginView();
  }
}

init();

document
  .querySelector("#express-login")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("login")) {
      e.preventDefault(); // Prevent the default form submission

      const username = document.getElementById("username").value.trim();

      fetchLogin(username)
        .then((response) => {
          state.username = response.username;
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
          render();
        });
      return;
    }
    if (e.target.classList.contains("update")) {
      e.preventDefault();
      const newWord = document.getElementById("newWord").value.trim();
      updateWord(newWord)
        .then((response) => {
          if (response.username != state.username) {
            state.username = null;
          }
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
          render();
        });
    }
    if (e.target.classList.contains("logout")) {
      e.preventDefault(); // Prevent the default form submission
      fetchLogout()
        .then((response) => {
          state.username = null;
          state.errorMessage = null;
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
          render();
        });
    }
    if (e.target.classList.contains("go-home")) {
      e.preventDefault(); // Prevent the default form submission
      renderLoginView();
    }
  });
