import { useState } from "react";
function CreatePost({ onAddPost, navigateTo }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPost({ title, content, imageUrl });
  };

  return (
    <div className="create-post">
      <div className="form-header">
        <h2>Create New Post</h2>
        <p>Share your thoughts with the community</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title">
            Title <span className="required">*</span>
          </label>
          <input
            type="text"
            value={title}
            id="post-title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's your post about?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-content">Content</label>
          <textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-image-url">Image URL</label>
          <div className="image-url-input">
            <input
              type="url"
              value={imageUrl}
              id="post-image-url"
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <button
              type="button"
              className="preview-btn"
              onClick={() => setPreviewImage(!previewImage)}
            >
              {previewImage ? "Hide Preview" : "Preview"}
            </button>
          </div>
          {previewImage && imageUrl && (
            <div className="image-preview">
              <img src={imageUrl} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigateTo("home")}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
