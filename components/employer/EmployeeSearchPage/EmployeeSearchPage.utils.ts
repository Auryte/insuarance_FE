import { EmployeesData } from '@/types/user';
import { SearchEmployeeState } from './EmployeeSearchPage';

export enum SearchEmployeeTypes {
  loadStart = 'loadStart',
  loadSuccess = 'loadSuccess',
  loadFailed = 'loadFailed',
}
type StartLoadAction = {
  type: SearchEmployeeTypes.loadStart;
};
type SuccessLoadAction = {
  type: SearchEmployeeTypes.loadSuccess;
  payload: EmployeesData;
};
type FailedLoadAction = {
  type: SearchEmployeeTypes.loadFailed;
};

export type SearchEmployeeAction = StartLoadAction | SuccessLoadAction | FailedLoadAction;

export function searchEmployeeReducer(
  state: SearchEmployeeState,
  action: SearchEmployeeAction,
): SearchEmployeeState {
  switch (action.type) {
    case SearchEmployeeTypes.loadStart:
      return { loading: true, state: null };
    case SearchEmployeeTypes.loadSuccess:
      return { loading: false, state: action.payload };
    case SearchEmployeeTypes.loadFailed:
      return { loading: false, state: null };
    default:
      return state;
  }
}
export const requestEmployee = (): StartLoadAction => ({ type: SearchEmployeeTypes.loadStart });
export const requestEmployeeSuccess = (data: EmployeesData): SuccessLoadAction => ({
  type: SearchEmployeeTypes.loadSuccess,
  payload: data,
});
export const requestEmployeeFailed = (): FailedLoadAction => ({
  type: SearchEmployeeTypes.loadFailed,
});
