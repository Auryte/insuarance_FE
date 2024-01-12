import { formatDate } from '@/utils/date';
import '@testing-library/jest-dom';
import { countEmptyRows } from '../ClaimsTable.utils';

describe('ClaimsTable utils - format date', () => {
  test('It should return formated date', () => {
    expect(formatDate('2022-12-02T17:09:58+0000')).toBe('2022-12-02');
  });
});

describe('count empty rows', () => {
  expect(countEmptyRows(2, 10, 23)).toBe(7);
});
