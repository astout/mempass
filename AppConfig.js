const limits = {
  minCount: 1,
  maxCount: 10,
  minLength: 8,
  maxLength: 1024,
  minWordLength: 1,
  maxWordLength: 45, // yep, look it up
  numMinLength: 1,
  numMaxLength: 4,
  numWordsMin: 1,
  numWordsMax: 256,
  symbols: ['.', '-', ':', '?', '*', '$', '!', '@', '#', '%', '^', '&', '+', '=', '_'],
};

const externalDefaults = {
  count: 3,
  minLength: 8,
  maxLength: 32,
};

const internalDefaults = {
  minWordLength: 4,
  maxWordLength: 6,
  numLength: 2,
  numWords: 2,
  startWithLetter: false,
  symbols: ['.', '-', ':'],
  transform: 'default',
};

module.exports = {
  internalDefaults,
  externalDefaults,
  limits,
};
