const { transform, transforms } = require('./transform');

const wordSet = [
  'apple',
  'green',
  'TastY',
];

describe('transform', () => {
  describe('defaults', () => {
    test('should return an empty array if no wordSet passed', () => {
      expect(transform()).toEqual([]);
    });
    test('should use default transform if no transform specified', () => {
      const actual = transform(wordSet);
      const expected = transform(wordSet, transforms.default);
      expect(actual).toEqual(expected);
    });
  });
  describe('lower', () => {
    test('should return array of all lower case strings', () => {
      const actual = transform(wordSet, transforms.lower).join('');
      expect(actual).toEqual('applegreentasty');
    });
  });
  describe('upper', () => {
    test('should return array of all upper case strings', () => {
      const actual = transform(wordSet, transforms.upper).join('');
      expect(actual).toEqual('APPLEGREENTASTY');
    });
  });
  describe('first', () => {
    test('should return array of capitalized words', () => {
      const actual = transform(wordSet, transforms.first).join('');
      expect(actual).toEqual('AppleGreenTasty');
    });
  });
  describe('reverseFirst', () => {
    test('should return array of reverse capitalized words', () => {
      const actual = transform(wordSet, transforms.reverseFirst).join('');
      expect(actual).toEqual('aPPLEgREENtASTY');
    });
  });
  describe('last', () => {
    test('should return array of capitalized last-letter words', () => {
      const actual = transform(wordSet, transforms.last).join('');
      expect(actual).toEqual('applEgreeNtastY');
    });
  });
  describe('alternating', () => {
    test('should return array of alternating case strings', () => {
      const actual = transform(wordSet, transforms.alternating).join('');
      expect(actual).toEqual('APPLEgreenTASTY');
    });
  });
  describe('default', () => {
    test('should return array of alternating case strings', () => {
      const actual = transform(wordSet, transforms.default);
      const expected = transform(wordSet, transforms.alternating);
      expect(actual).toEqual(expected);
    });
  });
});
