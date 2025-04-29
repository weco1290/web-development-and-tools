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

export function fetchPosts() {
  return fetch("/api/posts")
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchAddPost(post) {
  return fetch("/api/posts", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify(post),
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchUpvotePost(id) {
  return fetch(`/api/posts/${id}/upvote`, {
    method: "PATCH",
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchAddComment(postId, comment) {
  return fetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((err) => Promise.reject({ error: "Invalid JSON" }))
        .then((err) => Promise.reject(err));
    });
}
export function fetchUpdatePost(postId, updatedPost) {
  return fetch(`/api/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  })
    .catch(() => Promise.reject({ error: "network-error" }))
    .then((res) => {
      if (!res.ok) {
        return res
          .json()
          .catch((err) => Promise.reject({ error: "Invalid JSON" }))
          .then((err) => Promise.reject(err));
      }
      return res.json();
    });
}

export function fetchDeletePost(postId) {
  return fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  })
    .catch(() => Promise.reject({ error: "network-error" }))
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => Promise.reject(err));
      }
      return res.json();
    });
}
