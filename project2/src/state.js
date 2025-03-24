import { messages } from "../users";

const { MESSAGES_TO_USER } = require("./services");
const state = {
  username: "",
  messages: [],
  users: [],
  errorMessage: "",
  isLoggedIn: false,
  isLoginPending: true, // We start with our login status unknown
  isMessagePending: true,
  isUserPending: true,
};

export function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = "";
  state.messages = [];
  state.errorMessage = "";
}

export function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.errorMessage = "";
}

export function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = "";
  state.messages = [];
  state.errorMessage = "";
}

export function waitOnMessages() {
  state.messages = [];
  state.isMessagePending = true;
  state.error = "";
}

export function setError(error) {
  if (!error) {
    state.errorMessage = "";
    return;
  }
  state.isLoginPending = false;
  state.errorMessage = MESSAGES_TO_USER[error] || MESSAGES_TO_USER.default;
}

export default state;
