import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import { LOGIN_STATUS, SERVER, CLIENT, MESSAGES } from "./constants";
import {
  fetchLogin,
  fetchLogout,
  fetchPosts,
  fetchSession,
  fetchAddPost,
  fetchUpvotePost,
  fetchAddComment,
  fetchUpdatePost,
  fetchDeletePost,
} from "./services";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import CreatePost from "./CreatePost";
import PostPage from "./PostPage";

function App() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [currentPage, setCurrentPage] = useState("login");

  const [posts, setPosts] = useState([]);
  const [currentPostId, setCurrentPostId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const navigateTo = (page) => {
    setError("");
    setCurrentPage(page);
  };

  function onRegister(username) {
    fetchLogin(username)
      .then(() => {
        setCurrentPage("login");
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function onLogout() {
    setError("");
    setUsername("");
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setCurrentPage("login");
    fetchLogout().catch((err) => {
      setError(err?.error || "ERROR");
    });
  }

  function onLogin() {
    fetchSession()
      .then((session) => {
        setError("");
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setCurrentPage("home");

        return fetchPosts();
      })
      .then((posts) => {
        setIsLoading(false);
        setPosts(posts);
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          setError(err?.error || "ERROR");
          return;
        }
        setError(err?.error || "ERROR");
      });
  }

  const navigateToPost = (postId) => {
    setCurrentPostId(postId);
    setCurrentPage("post");
  };

  const renderContent = () => {
    if (loginStatus === LOGIN_STATUS.NOT_LOGGED_IN) {
      switch (currentPage) {
        case "login":
          return (
            <Login onLogin={onLogin} navigateTo={navigateTo} error={error} />
          );
        case "register":
          return (
            <Register
              onRegister={onRegister}
              navigateTo={navigateTo}
              error={error}
            />
          );
        default:
          return (
            <Login onLogin={onLogin} navigateTo={navigateTo} error={error} />
          );
      }
    } else if (loginStatus === LOGIN_STATUS.IS_LOGGED_IN) {
      if (isLoading) {
        return (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        );
      }
      switch (currentPage) {
        case "home":
          return (
            <Home
              username={username}
              posts={posts}
              navigateToPost={navigateToPost}
            />
          );
        case "create":
          return <CreatePost onAddPost={onAddPost} navigateTo={navigateTo} />;
        case "post":
          return (
            <PostPage
              username={username}
              posts={posts}
              postId={currentPostId}
              navigateTo={navigateTo}
              onUpvotePost={onUpvotePost}
              onAddComment={onAddComment}
              onEditPost={onEditPost}
              onDeletePost={onDeletePost}
            />
          );
        default:
          return (
            <Home
              username={username}
              posts={posts}
              navigateToPost={navigateToPost}
            />
          );
      }
    } else {
      return (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      );
    }
  };

  function onAddPost(post) {
    fetchAddPost({ ...post, author: username })
      .then((newPost) => {
        setPosts([
          ...posts,
          {
            ...newPost,
          },
        ]);
        navigateTo("home");
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function checkForSession() {
    fetchSession()
      .then((session) => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchPosts();
      })
      .then((posts) => {
        setIsLoading(false);
        setPosts(posts);
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);

          return;
        }

        setError(err?.error || "ERROR");
      });
  }

  function onUpvotePost(postId) {
    fetchUpvotePost(postId)
      .then((postId) => {
        setPosts(
          posts.map((post) => {
            if (post.id === postId) {
              return { ...post, upvotes: post.upvotes + 1 };
            }
            return post;
          })
        );
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);

          return;
        }

        setError(err?.error || "ERROR");
      });
  }

  function onAddComment(postId, comment) {
    fetchAddComment(postId, comment)
      .then((response) => {
        const { id, comment } = response;

        setPosts(
          posts.map((post) => {
            if (post.id === id) {
              return { ...post, comments: [...post.comments, comment] };
            }
            return post;
          })
        );
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);

          return;
        }

        setError(err?.error || "ERROR");
      });
  }

  function onEditPost(updatedPost) {
    const postId = updatedPost.id;
    fetchUpdatePost(postId, updatedPost)
      .then((response) => {
        const updatedPost = response.post;
        setPosts(
          posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        );
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);

          return;
        }

        setError(err?.error || "ERROR");
      });
  }

  function onDeletePost(postId) {
    fetchDeletePost(postId)
      .then((res) => {
        setPosts(posts.filter((post) => post.id !== postId));
        navigateTo("home");
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);

          return;
        }

        setError(err?.error || "ERROR");
      });
  }

  useEffect(() => {
    checkForSession();
  }, []);
  return (
    <div className={`app-container`}>
      <Header
        navigateTo={navigateTo}
        onLogout={onLogout}
        loginStatus={loginStatus}
      />

      <main className="main-content">{renderContent()}</main>
    </div>
  );
}

export default App;
