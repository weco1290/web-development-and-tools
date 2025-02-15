"use strict";
const words = require("./words");
const usersData = {}; // Stores user-specific words (username → storedWord)
// Function to check if username is valid
function isValidUsername(username) {
  const invalidChars = /[^a-zA-Z0-9]/; // Allows only letters, numbers
  return !invalidChars.test(username);
}
function pickWord(wordList) {
  return wordList[Math.floor(Math.random() * wordList.length)];
}
function exactMatch(word, guess) {
  return word.toUpperCase() === guess.toUpperCase(); // Case-insensitive compare
}

function compare(word, guess) {
  word = word.toLowerCase();
  guess = guess.toLowerCase();

  const createFrequencyMap = (word) => {
    const freqMap = {};
    for (const char of word) {
      freqMap[char] = (freqMap[char] || 0) + 1;
    }
    return freqMap;
  };
  const freq1 = createFrequencyMap(word);
  const freq2 = createFrequencyMap(guess);

  let count = 0;
  for (const char in freq1) {
    if (freq2[char]) {
      count += Math.min(freq1[char], freq2[char]);
    }
  }
  return count;
}
module.exports = { usersData, isValidUsername, pickWord, exactMatch, compare };
