"use strict";

const sessions = {}; // Stores user sessions (sid → username)
const usersData = {}; // Stores user-specific words (username → storedWord)
const cookieModel = {
  sessions,
  usersData,
};
module.exports = cookieModel;
