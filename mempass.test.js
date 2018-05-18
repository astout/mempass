const mempass = require('./index');

const wordSet = [
  'apple',
  'green',
  'TastY',
];

describe('randomNumberOfLength', () => {
  test('should return a string', () => {
    expect(typeof mempass.randomNumberOfLength()).toBe('string');
  });

  test('should return string number of given length', () => {
    expect(mempass.randomNumberOfLength(2).length).toBe(2);
    expect(mempass.randomNumberOfLength(3).length).toBe(3);
  });

  test('should return config string length by default', () => {
    expect(mempass.randomNumberOfLength().length).toBe(2);
  });
});

describe('transform', () => {
  describe('defaults', () => {
    test('should return an empty array if no wordSet passed', () => {
      expect(mempass.transform()).toEqual([]);
    });
    test('should use default transform if no transform specified', () => {
      const actual = mempass.transform(wordSet);
      const expected = mempass.transform(wordSet, mempass.transforms.default);
      expect(actual).toEqual(expected);
    });
  });
  describe('lower', () => {
    test('should return array of all lower case strings', () => {
      const actual = mempass.transform(wordSet, mempass.transforms.lower).join('');
      expect(actual).toEqual('applegreentasty');
    });
  });
  describe('upper', () => {
    test('should return array of all upper case strings', () => {
      const actual = mempass.transform(wordSet, mempass.transforms.upper).join('');
      expect(actual).toEqual('APPLEGREENTASTY');
    });
  });
  describe('first', () => {
    test('should return array of capitalized words', () => {
      const actual = mempass.transform(wordSet, mempass.transforms.first).join('');
      expect(actual).toEqual('AppleGreenTasty');
    });
  });
  describe('reverseFirst', () => {
    test('should return array of reverse capitalized words', () => {
      const actual = mempass.transform(wordSet, mempass.transforms.reverseFirst).join('');
      expect(actual).toEqual('aPPLEgREENtASTY');
    });
  });
  describe('last', () => {
    test('should return array of capitalized last-letter words', () => {
      const actual = mempass.transform(wordSet, mempass.transforms.last).join('');
      expect(actual).toEqual('applEgreeNtastY');
    });
  });
  describe('alternating', () => {
    test('should return array of alternating case strings', () => {
      const actual = mempass.transform(wordSet, mempass.transforms.alternating).join('');
      expect(actual).toEqual('APPLEgreenTASTY');
    });
  });
  describe('default', () => {
    test('should return array of alternating case strings', () => {
      const actual = mempass.transform(wordSet, mempass.transforms.default);
      const expected = mempass.transform(wordSet, mempass.transforms.alternating);
      expect(actual).toEqual(expected);
    });
  });
});

describe('genPasswd', () => {
  test('should generate a password', () => {
    expect(typeof mempass.genPasswd()).toBe('string');
  });
});
