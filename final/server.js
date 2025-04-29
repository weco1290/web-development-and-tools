import express from "express";
import cookieParser from "cookie-parser";
import sessions from "./sessions.js";
import users from "./users.js";
import { makePostList } from "./posts.js";

const app = express();

const PORT = 3000;
const postList = makePostList();

app.use(cookieParser());
app.use(express.static("./dist"));
app.use(express.json());

app.get("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  res.json({ username });
});

app.post("/api/session", (req, res) => {
  const { username } = req.body;

  if (!users.isValid(username)) {
    res.status(400).json({ error: "required-username" });
    return;
  }

  if (username === "dog") {
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }

  const sid = sessions.addSession(username);

  res.cookie("sid", sid);

  res.json({ username });
});

app.delete("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (sid) {
    res.clearCookie("sid");
  }

  if (username) {
    sessions.deleteSession(sid);
  }

  res.json({ wasLoggedin: !!username });
});

app.get("/api/posts", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const posts = postList.getPosts();

  res.json(posts);
});

app.post("/api/posts", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const { title, author, imageUrl, content } = req.body;
  if (!title) {
    res.status(400).json({ error: "required-post" });
    return;
  }

  const newPost = postList.addPost({ title, author, imageUrl, content });

  res.status(201).json(newPost);
});

app.patch("/api/posts/:id/upvote", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const { id } = req.params;
  const postId = postList.updateUpvotes(id);
  if (!postId) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json(postId);
});

app.post("/api/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  if (!id) {
    return res.status(404).json({ error: "Post not found" });
  }

  if (!comment) {
    return res.status(400).json({ error: "Comment cannot be empty" });
  }

  postList.addComments(id, comment);

  res.json({ id, comment });
});

app.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, imageUrl } = req.body;

  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !users.isValid(username)) {
    return res.status(401).json({ error: "auth-missing" });
  }

  if (!title) {
    return res.status(400).json({ error: "Missing title" });
  }

  const updatedPost = postList.updatePost(id, { title, content, imageUrl });

  if (!updatedPost) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json({ post: updatedPost });
});

app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !users.isValid(username)) {
    return res.status(401).json({ error: "auth-missing" });
  }

  const success = postList.deletePost(id);

  if (!success) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json({ success: true });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
