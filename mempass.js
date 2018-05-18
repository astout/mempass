const wordlist = require('wordlist-english');
const _ = require('lodash');

const eng1 = wordlist['english/10'];
const eng2 = wordlist['english/20'];
const eng3 = wordlist['english/35'];
const words = eng1.concat(eng2).concat(eng3);

const transforms = {
  upper: 'upper', // all upper case
  lower: 'lower', // all lower case
  alternating: 'alternating', // EVERY.other.CASE
  default: 'alternating', // defined default
  first: 'first', // First.Letter.Capitalized
  reverseFirst: 'reverseFirst', // 'fIRST.lETTER.nOT.cAPITALIZED'
  last: 'last', // lasT.letteR.capitalizeD
};

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
  transform: transforms.default,
};

const randomNumberOfLength = (length = internalDefaults.numLength) => (
  _.join(_.times(length, () => _.random(9)), '')
);

const transform = (wordSet = [], setting = internalDefaults.transform) => {
  switch (setting) {
    case transforms.lower:
      return wordSet.map(_.toLower);
    case transforms.upper:
      return wordSet.map(_.toUpper);
    case transforms.first:
      return wordSet.map(_.capitalize);
    case transforms.reverseFirst:
      return wordSet.map(w => _.lowerFirst(_.toUpper(w)));
    case transforms.last:
      return wordSet.map((w) => {
        let r = _.toLower(w);
        let c = _.last(r);
        r = r.slice(0, -1);
        c = _.toUpper(c);
        r = r.concat(c);
        return r;
      });
    case transforms.alternating:
    case transforms.default:
    default:
      return wordSet.map(((w, i) => (i % 2 ? _.toLower(w) : _.toUpper(w))));
  }
};

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
  limits,
  internalDefaults,
  externalDefaults,
  genPasswd,
  genPasswds,
  randomNumberOfLength,
  transform,
  transforms,
};

