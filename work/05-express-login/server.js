"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

const controllers = require("./cookie-controller");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", controllers.homePage);

app.post("/session", controllers.session);

// 🔹 Update the stored word
app.post("/update", controllers.update);

// 🔹 Logout route (clears session)
app.get("/logout", controllers.logout);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
