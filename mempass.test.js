const _ = require('lodash');
const mempass = require('./mempass');

describe('mempass', () => {
  test('should have genPasswd, genPasswds, and transforms properties', () => {
    _.isFunction(mempass.genPasswd);
    _.isFunction(mempass.genPasswds);
    _.isObject(mempass.transforms);
  });
  describe('genPasswd', () => {
    test('should generate a password', () => {
      expect(typeof mempass.genPasswd()).toBe('string');
    });
  });
});
