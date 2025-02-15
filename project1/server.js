"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

const controllers = require("./compare-controller");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", controllers.homePage);

app.post("/login", controllers.login);

// 🔹 Update the stored word
app.post("/guess", controllers.guess);

// 🔹 Logout route (clears session)
app.post("/logout", controllers.logout);

app.post("/new-game", controllers.newGame);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
