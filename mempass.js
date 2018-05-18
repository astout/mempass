const wordlist = require('wordlist-english');
const _ = require('lodash');
const { internalDefaults, externalDefaults, limits } = require('./AppConfig');
const { transform, transforms } = require('./transform');
const { randomNumberOfLength } = require('./utils');

const eng1 = wordlist['english/10'];
const eng2 = wordlist['english/20'];
const eng3 = wordlist['english/35'];
const words = eng1.concat(eng2).concat(eng3);

const genPasswd = (configuration = internalDefaults) => {
  const config = _.defaults(configuration, internalDefaults);

  config.minWordLength = _.min([config.minWordLength, limits.maxWordLength]);
  config.minWordLength = _.min([config.minWordLength, config.maxWordLength]);
  config.minWordLength = _.max([config.minWordLength, limits.minWordLength]);

  config.maxWordLength = _.max([config.maxWordLength, limits.minWordLength]);
  config.maxWordLength = _.max([config.minWordLength, config.maxWordLength]);
  config.maxWordLength = _.min([config.maxWordLength, limits.maxWordLength]);

  config.numLength = _.min([config.numLength, limits.maxNumLength]);
  config.numLength = _.max([config.numLength, limits.minNumLength]);

  config.numWords = _.min([config.numWords, limits.maxNumWords]);
  config.numWords = _.max([config.numWords, limits.minNumWords]);

  config.symbols = _.filter(config.symbols, s => _.includes(limits.symbols, s));

  const usableWords = words.filter(w =>
    (w.length >= config.minWordLength && w.length <= config.maxWordLength));

  const wordSample = _.sampleSize(usableWords, config.numWords);
  const symbol = _.sample(config.symbols);

  let pword = transform(wordSample).join(symbol);

  if (config.startWithLetter) {
    pword = `${pword}${symbol}${randomNumberOfLength(config.numLength)}`;
  } else {
    const n1 = randomNumberOfLength(config.numLength);
    const n2 = randomNumberOfLength(config.numLength);
    pword = `${n1}${symbol}${pword}${symbol}${n2}`;
  }

  return pword;
};

const genPasswds = (externalConfig = externalDefaults, internalConfig = internalDefaults) => {
  const config = _.defaults(externalConfig, externalDefaults);

  config.minLength = _.min([config.minLength, limits.maxLength]);
  config.minLength = _.min([config.minLength, config.maxLength]);
  config.minLength = _.max([config.minLength, limits.minLength]);

  config.maxLength = _.max([config.maxLength, limits.minLength]);
  config.maxLength = _.max([config.minLength, config.maxLength]);
  config.maxLength = _.min([config.maxLength, limits.maxLength]);
  const results = [];
  for (let i = 0; i < 1000; i += 1) {
    const attempt = genPasswd(internalConfig);
    if (attempt.length >= config.minLength && attempt.length <= config.maxLength) {
      results.push(attempt);
    }
    if (results.length === config.count) {
      return results;
    }
  }
  throw new Error('The configuration is too inefficient');
};

module.exports = {
  genPasswd,
  genPasswds,
  transforms,
};

