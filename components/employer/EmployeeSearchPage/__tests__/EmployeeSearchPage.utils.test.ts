import { mockResponse } from '@/mocks/mockUser';
import { searchEmployeeReducer, SearchEmployeeTypes } from '../EmployeeSearchPage.utils';

describe('Search employee reducer tests', () => {
  test('loading start', () => {
    expect(
      searchEmployeeReducer(
        { loading: false, state: null },
        { type: SearchEmployeeTypes.loadStart },
      ),
    ).toEqual({ loading: true, state: null });
  });

  test('loading success', () => {
    expect(
      searchEmployeeReducer(
        { loading: false, state: null },
        { type: SearchEmployeeTypes.loadSuccess, payload: mockResponse },
      ),
    ).toEqual({ loading: false, state: mockResponse });
  });

  test('loading failed', () => {
    expect(
      searchEmployeeReducer(
        { loading: false, state: null },
        { type: SearchEmployeeTypes.loadFailed },
      ),
    ).toEqual({ loading: false, state: null });
  });

  test('default case', () => {
    expect(
      searchEmployeeReducer(
        { loading: false, state: null },
        { type: 'invalid case' as SearchEmployeeTypes.loadStart },
      ),
    ).toEqual({ loading: false, state: null });
  });
});
