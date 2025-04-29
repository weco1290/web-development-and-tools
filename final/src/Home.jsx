import { useState } from "react";
import { fetchPosts } from "./services";
import { useEffect } from "react";
function Home({ username, posts, navigateToPost }) {
  const [sortBy, setSortBy] = useState("time");

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "time") {
        return new Date(b.creationTime) - new Date(a.creationTime);
      } else if (sortBy === "upvotes") {
        return b.upvotes - a.upvotes;
      } else if (sortBy === "comments") {
        return b.comments.length - a.comments.length;
      }
    });

  return (
    <div className="home-container">
      <h2>Welcome, {username}!</h2>
      <p>What would you like to do today?</p>
      <div className="controls">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="sort-options">
          <label htmlFor="sort_by">Sort by: </label>
          <select
            id="sort_by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="time">Latest</option>
            <option value="upvotes">Most Popular</option>
            <option value="comments">Most Comment</option>
          </select>
        </div>
      </div>

      <div className="posts-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="post-card"
              onClick={() => navigateToPost(post.id)}
            >
              {post.imageUrl && (
                <div className="post-card-image">
                  <img src={post.imageUrl} alt={post.title} />
                </div>
              )}
              <div className="post-card-content">
                <h2>{post.title}</h2>

                <div className="post-meta">
                  <span className="post-date">
                    <span className="meta-icon">🕒</span>
                    {new Date(post.creationTime).toLocaleDateString()}
                  </span>
                  <span className="post-upvotes">
                    <span className="meta-icon">👍</span>
                    {post.upvotes}
                  </span>
                  <span className="post-comments">
                    <span className="meta-icon">💬</span>
                    {post.comments.length}
                  </span>
                  <span className="post-author">
                    <span className="meta-icon">👤</span>{" "}
                    {post.author || "author"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-posts">
            <p>No posts found</p>
            <span className="empty-icon">📭</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
