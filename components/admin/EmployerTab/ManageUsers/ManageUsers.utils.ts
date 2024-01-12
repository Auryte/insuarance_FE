import { UsersData } from '@/types/user';
import { UsersState } from './ManageUsers';

export enum UserActionTypes {
  loadStart = 'loadStart',
  loadSuccess = 'loadSuccess',
  loadFailed = 'loadFailed',
}

type StartLoadAction = {
  type: UserActionTypes.loadStart;
};

type SuccessLoadAction = {
  type: UserActionTypes.loadSuccess;
  payload: UsersData;
};

type FailedLoadAction = {
  type: UserActionTypes.loadFailed;
};

export type UsersAction = StartLoadAction | SuccessLoadAction | FailedLoadAction;

export function usersReducer(state: UsersState, action: UsersAction): UsersState {
  switch (action.type) {
    case UserActionTypes.loadStart:
      return { ...state, loading: true };
    case UserActionTypes.loadSuccess:
      return { loading: false, state: action.payload };
    case UserActionTypes.loadFailed:
      return { loading: false, state: null };
    default:
      return state;
  }
}

export const requestUsers = (): StartLoadAction => ({ type: UserActionTypes.loadStart });
export const requestUsersSuccess = (data: UsersData): SuccessLoadAction => ({
  type: UserActionTypes.loadSuccess,
  payload: data,
});
export const requestUsersFailed = (): FailedLoadAction => ({ type: UserActionTypes.loadFailed });
