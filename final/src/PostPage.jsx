import { useState, useEffect } from "react";
function PostPage({
  username,
  posts,
  postId,
  onUpvotePost,
  navigateTo,
  onAddComment,
  onEditPost,
  onDeletePost,
}) {
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const post = posts.find((p) => p.id === postId);

  if (!post) return null;

  useEffect(() => {
    if (!post) {
      navigateTo("home");
    } else if (isEditing) {
      setEditTitle(post.title);
      setEditContent(post.content);
      setEditImageUrl(post.imageUrl);
    }
  }, [post, isEditing]);

  const handleDelete = () => {
    onDeletePost(post.id);
  };

  const handleUpvote = () => {
    onUpvotePost(post.id);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(postId, comment);
      setComment("");
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEditPost({
      ...post,
      title: editTitle,
      content: editContent,
      imageUrl: editImageUrl,
    });

    setIsEditing(false);
  };

  return (
    <div className="post-page">
      <div className="back-nav">
        <button className="back-btn" onClick={() => navigateTo("home")}>
          <span>←</span> Back to Home
        </button>
      </div>
      {isEditing ? (
        <div className="edit-post">
          <h2>Edit Post</h2>
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label htmlFor="edit-title">
                Title <span className="required">*</span>
              </label>
              <input
                type="text"
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-content">Content</label>
              <textarea
                id="edit-content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-image-url">Image URL</label>
              <input
                type="url"
                value={editImageUrl}
                id="edit-image-url"
                onChange={(e) => setEditImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {editImageUrl && (
                <div className="image-preview">
                  <img src={editImageUrl} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <article className="post-content-container">
            <div className="post-header">
              <h1>{post.title}</h1>
              <div className="post-meta">
                <span className="post-author">
                  <span className="meta-icon">👤</span>
                  {post.author || "author"}
                </span>
                <span className="post-date">
                  <span className="meta-icon">🕒</span>
                  {new Date(post.creationTime).toLocaleString()}
                </span>
              </div>
            </div>

            {post.imageUrl && (
              <div className="post-feature-image">
                <img src={post.imageUrl} alt={post.title} />
              </div>
            )}

            <div className="post-body">
              {post.content ? (
                <p className="post-text">{post.content}</p>
              ) : (
                <p className="post-text empty">
                  No additional content for this post.
                </p>
              )}
            </div>

            <div className="post-actions">
              <div className="upvote-section">
                <button className="upvote-btn" onClick={handleUpvote}>
                  <span className="upvote-icon">👍</span>
                  <span className="upvote-count">{post.upvotes}</span>
                </button>
              </div>

              <div className="edit-actions">
                {username === post.author ? (
                  <div>
                    <button
                      className="edit-btn"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                    <button className="delete-btn" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </article>
          <div className="comments-section">
            <h3>Comments ({post.comments.length})</h3>
            <form onSubmit={handleAddComment} className="comment-form">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                rows="3"
              />
              <button type="submit" className="comment-btn">
                Post Comment
              </button>
            </form>

            <div className="comments-list">
              {post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <div className="comment-avatar">
                      <div className="avatar-placeholder">{index + 1}</div>
                    </div>
                    <div className="comment-content">
                      <div className="comment-meta">
                        <span className="comment-author">User {index + 1}</span>
                      </div>
                      <p>{comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-comments">
                  <p>No comments yet. Be the first to comment!</p>
                  <span className="empty-icon">💬</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PostPage;
