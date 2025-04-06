"use strict";
import express from "express";
import cookieParser from "cookie-parser";
import {
  sessions,
  addSession,
  deleteSession,
  getSessionUser,
} from "./sessions.js";
import { wordFor, isValidUsername, isValidWord } from "./users.js";
const app = express();
const PORT = 3000;

app.use(express.static("./dist"));
app.use(cookieParser());
app.use(express.json());

app.get("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json({ username });
});

app.post("/api/session", (req, res) => {
  const { username } = req.body;

  if (!isValidUsername(username)) {
    res.status(400).json({ error: "required-username" });
    return;
  }

  if (username === "dog") {
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }

  const sid = addSession(username);

  res.cookie("sid", sid);

  wordFor[username] ||= "";

  res.json({ username });
});

app.delete("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? getSessionUser(sid) : "";
  if (sid) {
    res.clearCookie("sid");
  }

  if (username) {
    deleteSession(sid);
  }

  res.json({ wasLoggedin: !!username });
});

app.get("/api/word", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const storeWord = wordFor[username] || "";
  res.json({ username, storeWord });
});

app.put("/api/word", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const { word } = req.body;
  if (!word && word !== "") {
    res.status(400).json({ error: "required-word" });
    return;
  }
  if (!isValidWord(word)) {
    res.status(400).json({ error: "invalid-word" });
    return;
  }
  wordFor[username] = word;

  res.json({ username, storeWord: word });
});
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
