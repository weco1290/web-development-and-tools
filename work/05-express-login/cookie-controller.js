"use strict";
const cookieModel = require("./cookie-model");
const cookieView = require("./cookie-view");
const controllers = {};
// No npm install needed, crypto is part of Node
const uuidv4 = require("crypto").randomUUID;

// Function to check if username is valid
function isValidUsername(username) {
  const invalidChars = /[^a-zA-Z0-9_-]/; // Allows only letters, numbers, _ and -
  return !invalidChars.test(username);
}

controllers.homePage = function (req, res) {
  const sid = req.cookies.sid;

  if (sid && cookieModel.sessions[sid]) {
    const username = cookieModel.sessions[sid];
    const storedWord = cookieModel.usersData[username]?.storedWord || "";
    res.send(cookieView.loginPage(username, storedWord));
  } else {
    res.send(cookieView.indexPage());
  }
};

controllers.session = function (req, res) {
  const username = req.body.username.trim();

  if (!username) {
    res.status(400).send("Username is required");
    return;
  }

  if (username === "dog") {
    // Simulates a restricted user
    res.status(403).send("User account not permitted");
    return;
  }

  if (!isValidUsername(username)) {
    // If username contains invalid characters
    res.status(400).send("Error: Invalid username");
    return;
  }

  const sid = uuidv4();
  cookieModel.sessions[sid] = username; // Store session
  cookieModel.usersData[username] = cookieModel.usersData[username] || {
    storedWord: "",
  }; // Initialize user data if new

  res.cookie("sid", sid, { httpOnly: true, secure: false }); // Secure: false for local dev
  res.redirect("/");
};
controllers.update = function (req, res) {
  const sid = req.cookies.sid;
  if (!sid || !cookieModel.sessions[sid]) {
    res.status(401).send("Unauthorized. Please log in.");
    return;
  }

  const username = cookieModel.sessions[sid];
  const newWord = req.body.newWord.trim();

  if (!newWord) {
    res.status(400).send("Word cannot be empty.");
    return;
  }

  cookieModel.usersData[username].storedWord = newWord;
  res.redirect("/");
};
controllers.logout = function (req, res) {
  const sid = req.cookies.sid;
  if (sid) {
    delete cookieModel.sessions[sid]; // Remove session from memory
  }
  res.clearCookie("sid");
  res.redirect("/");
};

module.exports = controllers;
