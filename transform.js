const _ = require('lodash');
const { internalDefaults } = require('./AppConfig');

const transforms = {
  upper: 'upper', // all upper case
  lower: 'lower', // all lower case
  alternating: 'alternating', // EVERY.other.CASE
  default: 'default', // defined default (alternating)
  first: 'first', // First.Letter.Capitalized
  reverseFirst: 'reverseFirst', // 'fIRST.lETTER.nOT.cAPITALIZED'
  last: 'last', // lasT.letteR.capitalizeD
};

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

module.exports = {
  transform,
  transforms,
};
