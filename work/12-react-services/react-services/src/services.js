export const MESSAGES_TO_USER = {
  "network-error":
    "The server is currently unavailable. Please try again later.",
  "required-username":
    "The username must consist of letters, numbers, and underscores only. Please correct your input.",
  "auth-insufficient": "Bad password, dog is NOT allowed!",
  "required-word": "A word is required. Please provide a valid input.",
  "invalid-word": "The provided word is invalid. Please enter a valid word.",
  default: "An unexpected error occurred. Please try again.",
};

export function fetchLogin(username) {
  return fetch("/api/session/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username }),
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchLogout() {
  return fetch("/api/session", {
    method: "DELETE",
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchSession() {
  return fetch("/api/session", {
    method: "GET",
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchWord() {
  return fetch("/api/word", {
    method: "GET",
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function updateWord(word) {
  return fetch("/api/word", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word }),
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}
