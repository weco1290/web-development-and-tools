"use strict";
const cookieView = {
  loginPage: function (username, storedWord) {
    return `
      <h1>Welcome, ${username}!</h1>
      <p>Your stored word: <strong>${storedWord}</strong></p>
      <form action="/update" method="POST">
        <input type="text" name="newWord" placeholder="Enter new word" required>
        <button type="submit">Update Word</button>
      </form>
      <br>
      <a href="/logout">Logout</a>
    `;
  },
  indexPage: function () {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login</title>
  </head>
  <body>
    <h1>Login</h1>
    <form action="/session" method="POST">
      <input type="text" name="username" placeholder="Enter username" />
      <button type="submit">Login</button>
    </form>
  </body>
</html>
`;
  },
};
module.exports = cookieView;
