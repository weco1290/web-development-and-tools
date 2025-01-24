"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {
  // DO NOT MODIFY THIS LINE
  word = word.toLowerCase();
  guess = guess.toLowerCase();

  /* YOU MAY MODIFY THE LINES BELOW */
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
