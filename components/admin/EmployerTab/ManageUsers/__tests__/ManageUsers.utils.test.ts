import { mockEmployerUsersResponse } from '@/mocks/mockUsers';
import { usersReducer, UserActionTypes } from '../ManageUsers.utils';

describe('usersReducer', () => {
  test('loading start', () => {
    expect(
      usersReducer({ loading: false, state: null }, { type: UserActionTypes.loadStart }),
    ).toEqual({ loading: true, state: null });
  });

  test('loading success', () => {
    expect(
      usersReducer(
        { loading: false, state: null },
        { type: UserActionTypes.loadSuccess, payload: mockEmployerUsersResponse },
      ),
    ).toEqual({ loading: false, state: mockEmployerUsersResponse });
  });

  test('loading failed', () => {
    expect(
      usersReducer({ loading: false, state: null }, { type: UserActionTypes.loadFailed }),
    ).toEqual({ loading: false, state: null });
  });

  test('default case', () => {
    expect(
      usersReducer(
        {
          loading: false,
          state: null,
        },
        { type: 'default case' as UserActionTypes.loadStart },
      ),
    ).toEqual({ loading: false, state: null });
  });
});
