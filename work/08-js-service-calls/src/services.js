// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

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
  return (
    fetch("/api/session/", {
      method: "POST",
      headers: {
        "content-type": "application/json", // set this header when sending JSON in the body of request
      },
      body: JSON.stringify({ username }),
    })
      // fetch() rejects on network error
      // So we convert that to a formatted error object
      // so our caller can handle all "errors" in a similar way
      .catch((err) => Promise.reject({ error: "network-error" }))
      .then((response) => {
        if (!response.ok) {
          // response.ok checks the status code from the service
          // This service returns JSON on errors,
          // so we use that as the error object and reject
          return response.json().then((err) => Promise.reject(err));
        }
        return response.json(); // happy status code means resolve with data from service
      })
  );
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
