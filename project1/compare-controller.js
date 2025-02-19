"use strict";
const sessionModel = require("./session-model");
const {
  usersData,
  isValidUsername,
  pickWord,
  exactMatch,
  compare,
} = require("./compare-model");
const {
  renderHomePage,
  renderLoginPage,
  renderNewGame,
} = require("./compare-view");
// No npm install needed, crypto is part of Node
const uuidv4 = require("crypto").randomUUID;
const words = require("./words");

function homePage(req, res) {
  const sid = req.cookies.sid;

  if (sid && sessionModel.sessions[sid]) {
    const username = sessionModel.sessions[sid];

    res.send(renderHomePage(username, usersData[username], usersData));
  } else {
    res.send(renderLoginPage());
  }
}

function login(req, res) {
  const username = req.body.username.trim();

  if (!username) {
    res.status(400).send(renderLoginPage("<p>Error: Username is required</p>"));
    return;
  }

  if (username === "dog") {
    // Simulates a restricted user
    res
      .status(403)
      .send(renderLoginPage("<p>Error: User account not permitted</p>"));
    return;
  }

  if (!isValidUsername(username)) {
    // If username contains invalid characters
    res
      .status(400)
      .send(
        renderLoginPage(
          "<p>Error: Invalid username: Usernames can only contain letters, numbers.</p>"
        )
      );
    return;
  }

  const sid = uuidv4();
  sessionModel.sessions[sid] = username; // Store session
  usersData[username] = usersData[username] || {
    word: process.env.OVERRIDE || pickWord(words),
    turns: 0,
    guesses: [],
    matchCounts: [],
    lastGuess: null,
    lastMatchCount: 0,
    won: false,
    invalid: false,
  }; // Initialize user data if new
  console.log(usersData);

  res.cookie("sid", sid, { httpOnly: true, secure: false }); // Secure: false for local dev
  res.redirect("/");
}

function logout(req, res) {
  const sid = req.cookies.sid;

  if (sid) {
    delete sessionModel.sessions[sid]; // Remove session from memory
  }

  res.clearCookie("sid");
  res.redirect("/");
}
function guess(req, res) {
  const sid = req.cookies.sid;
  if (!sid) {
    res.clearCookie("sid");
    res.redirect("/");
  }
  const username = sessionModel.sessions[sid];
  const guess = req.body.newWord.trim();

  if (!guess) {
    res.status(400).send("Word cannot be empty.");
    return;
  }

  const game = usersData[username];

  game.turns++;
  const normalizedGuess = guess.toLowerCase(); // Normalize the guess for case-insensitive comparison

  // Check if the guess is in the possible words list
  const isInPossibleWords = words.includes(normalizedGuess);

  // Check if the guess has already been made in this game
  const hasBeenGuessed = game.guesses.includes(normalizedGuess);
  game.lastGuess = guess;
  if (isInPossibleWords && !hasBeenGuessed) {
    game.invalid = false;

    game.guesses.push(normalizedGuess); // Store valid guess

    if (exactMatch(game.word, guess)) {
      game.lastMatchCount = game.word.length;
      game.matchCounts.push(game.lastMatchCount);
      game.won = true;
      //delete usersData[username]; // Clear game after winning
    } else {
      game.lastMatchCount = compare(game.word, guess);
      game.matchCounts.push(game.lastMatchCount);
      game.won = false;
    }
  } else {
    game.invalid = true;
  }

  res.redirect("/");
}

function newGame(req, res) {
  const sid = req.cookies.sid;

  // Check for a valid session
  if (!sid || !sessionModel.sessions[sid]) {
    // If no valid session, display a message and login form
    return res.send(renderNewGame());
  }

  const username = sessionModel.sessions[sid]; // Get the username from the session
  const user = usersData[username]; // Get the user data

  // Reset the user's game state (e.g., clear guesses, reset win status)
  usersData[username] = {
    word: process.env.OVERRIDE || pickWord(words),
    turns: 0,
    guesses: [],
    matchCounts: [],
    lastGuess: null,
    lastMatchCount: 0,
    won: false,
    invalid: false,
  }; // Initialize user data if new
  console.log(usersData);

  // Log the username and the secret word (for grading, but will be removed before submission)
  console.log(`New game started for ${username}`);

  // Redirect to home page to start playing the new game
  res.redirect("/");
}

const compareController = {
  homePage,
  login,
  logout,
  guess,
  newGame,
};

module.exports = compareController;
