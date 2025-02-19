"use strict";
const words = require("./words");
function renderHomePage(username, user, usersData) {
  const hasWon = user && user.won; // Check if the user has won
  console.log(user);
  // If user has won, they should not be able to make a guess
  const guessForm = hasWon
    ? ""
    : `
        <form action="/guess" method="POST">
          <label for="newWord">Enter new word:</label>
          <input type="text" id="newWord" name="newWord">
          <button type="submit">Make a guess</button>
        </form>
      `;

  // Display winning message if the user has won
  const winMessage = hasWon
    ? `<h2>Congratulations, ${username}! You've won the game!</h2>`
    : "";
  // Display details about the most recent guess (valid or invalid)
  let recentGuessMessage = "";
  if (user.lastGuess) {
    if (!user.invalid) {
      recentGuessMessage = `<p>Your most recent valid guess was "${
        user.lastGuess
      }", which matched ${
        user.matchCounts[user.matchCounts.length - 1]
      } letters.</p>`;
    } else if (user.invalid) {
      recentGuessMessage = `<p>Your most recent guess "${user.lastGuess}" was invalid</p>`;
    }
  }

  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div id="express-login">
              <h1>Welcome, ${username}!</h1>
              <form action="/logout" method="POST">
                    <button class="logout" type="submit">Logout</button>
                </form>
              ${winMessage}
              ${recentGuessMessage}
              ${getWordList(words)}
              ${generateGuessesList(usersData, username)}
              ${guessForm}
              <div class="button-group">
                
                
                <form action="/new-game" method="POST">
                    <button class="new-game" type="submit">Start New Game</button>
                </form>
              </div>
          </div>
        </body>
        </html>
      `;
}

function getWordList(words) {
  return (
    `<ul class="word-list">` +
    words
      .map(
        (word) => `
          <li class="word-item">
            <span class="word">${word}</span>
          </li>
        `
      )
      .join("") +
    `</ul>`
  );
}

function generateGuessesList(userdata, username) {
  const game = userdata[username]; // Access the game object of the given username
  return (
    `<ul class="guesses">` +
    game.guesses
      .map(
        (guess, index) => `
          <li>
            <strong>Guess ${index + 1}:</strong> ${guess} 
            <span>(Matched ${game.matchCounts[index]} letters)</span>
          </li>
        `
      )
      .join("") +
    `</ul>`
  );
}

function renderLoginPage(message) {
  message = message || "";
  return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Login</title>
            <link rel="stylesheet" href="styles.css">
          </head>
          <body>
            <div id="express-login">
                <h1>Login</h1>
                ${message}
                <form action="/login" method="POST">
                <label for="username">Username</label>
                <input type="text" id="username" name="username"/>
                <button type="submit">Login</button>
                </form>
            </div>
          </body>
        </html>
      `;
}

function renderNewGame() {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Required</title>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <div id="express-login">
          <h1>Session Expired or Invalid</h1>
          <p>Please log in again to start a new game.</p>
          <form action="/login" method="POST">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required>
            <button type="submit">Login</button>
          </form>
        </div>
      </body>
      </html>
    `;
}

module.exports = { renderHomePage, renderLoginPage, renderNewGame };
