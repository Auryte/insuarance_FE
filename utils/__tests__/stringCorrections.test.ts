import '@testing-library/jest-dom';
import { capitalizeFirstLetter, separateCapitalizeName } from '../stringCorrections';

describe('String corrections', () => {
  test('It should return separated camelCase string', () => {
    expect(separateCapitalizeName('zipCode')).toBe('zip Code');
  });
  test('It should return string with capitalized first letter', () => {
    expect(capitalizeFirstLetter('name')).toBe('Name');
    expect(capitalizeFirstLetter('zipCode')).toBe('Zip Code');
  });
});
