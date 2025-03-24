const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json()); // Applying to ALL requests (if correct content-type)

const sessions = require("./sessions");
const users = require("./users");

// Sessions
// Check for existing session (used on page load)
app.get("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  res.json({ username });
});

// Create a new session (login)
app.post("/api/session", (req, res) => {
  const { username } = req.body;

  if (!users.isValidUsername(username)) {
    res.status(400).json({ error: "required-username" });
    return;
  }

  if (username === "dog") {
    // Should move this to a function as well!
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }

  const sid = sessions.addSession(username);

  res.cookie("sid", sid);
  // If they don't have a word, we default one
  // users.wordFor[username] ||= "";

  res.json({ username });
});

app.delete("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (sid) {
    res.clearCookie("sid");
  }

  if (username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }

  // We don't report any error if sid or session didn't exist
  // Because that means we already have what we want
  res.json({ wasLoggedIn: !!username }); // Provides some extra info that can be safely ignored
});

// Get all logged-in usernames
app.get("/api/logged-in-users", (req, res) => {
  const loggedInUsers = sessions
    .getAllSessions()
    .map((session) => session.username);

  res.json({ loggedInUsers });
});

// Stored Word

app.get("/api/message", (req, res) => {
  // Session checks for these are very repetitive - a good place to abstract out
  // I've left the repetitive sections here for ease of learning
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const messages = users.messages || "";

  res.json({ username, messages: messages });
});

app.post("/api/message", (req, res) => {
  // Session checks for these are very repetitive - a good place to abstract out
  // I've left the repetitive sections here for ease of learning
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const { word } = req.body;

  if (!word || word === "") {
    // Empty word explicitly allowed
    res.status(400).json({ error: "required-word" });
    return;
  }

  if (!users.isValidWord(word)) {
    res.status(400).json({ error: "invalid-word" });
    return;
  }

  const timestamp = Date.now();

  users.wordFor[username] = word;
  users.addMessage({ sender: username, text: word, timestamp });

  res.json({ username, messages: users.messages, timestamp });
});

app.get("/api/message/:id", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const { id } = req.params;
  const newMessages = users.messages.filter(
    (message) => message.timestamp > id
  );
  console.log(id);
  res.json({ newMessages });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
