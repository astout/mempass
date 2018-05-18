const _ = require('lodash');
const { internalDefaults } = require('./AppConfig');

const randomNumberOfLength = (length = internalDefaults.numLength) => (
  _.join(_.times(length, () => _.random(9)), '')
);

module.exports = {
  randomNumberOfLength,
};
