const { randomNumberOfLength } = require('./utils');

describe('utils', () => {
  describe('randomNumberOfLength', () => {
    test('should return a string', () => {
      expect(typeof randomNumberOfLength()).toBe('string');
    });

    test('should return string number of given length', () => {
      expect(randomNumberOfLength(2).length).toBe(2);
      expect(randomNumberOfLength(3).length).toBe(3);
    });

    test('should return config string length by default', () => {
      expect(randomNumberOfLength().length).toBe(2);
    });
  });
});
