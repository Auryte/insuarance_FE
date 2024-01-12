import { PlanYear } from '@/types/insurance';
import { PlansState } from './ManagePlans';

export enum PlanActionTypes {
  loadStart = 'loadStart',
  loadSuccess = 'loadSuccess',
  loadFailed = 'loadFailed',
  remove = 'remove',
  initialize = 'initialize',
}

type StartLoadAction = {
  type: PlanActionTypes.loadStart;
};

type SuccessLoadAction = {
  type: PlanActionTypes.loadSuccess;
  payload: PlanYear[];
};

type FailedLoadAction = {
  type: PlanActionTypes.loadFailed;
};

type RemovePlanAction = {
  type: PlanActionTypes.remove;
  payload: string;
};

type InitializePlanAction = {
  type: PlanActionTypes.initialize;
  payload: PlanYear;
};

export type PlansAction =
  | StartLoadAction
  | SuccessLoadAction
  | FailedLoadAction
  | RemovePlanAction
  | InitializePlanAction;

export function plansReducer(state: PlansState, action: PlansAction): PlansState {
  switch (action.type) {
    case PlanActionTypes.loadStart:
      return { ...state, loading: true };
    case PlanActionTypes.loadSuccess:
      return { loading: false, data: action.payload };
    case PlanActionTypes.loadFailed:
      return { loading: false, data: null };
    case PlanActionTypes.remove:
      return {
        loading: false,
        data: state.data!.filter(plan => plan.id !== action.payload),
      };
    case PlanActionTypes.initialize:
      return {
        ...state,
        data: state.data!.map(plan => {
          if (plan.id === action.payload.id) {
            return action.payload;
          }
          return plan;
        }),
      };
    default:
      return state;
  }
}

export const requestPlans = (): StartLoadAction => ({ type: PlanActionTypes.loadStart });
export const requestPlansSuccess = (data: PlanYear[]): SuccessLoadAction => ({
  type: PlanActionTypes.loadSuccess,
  payload: data,
});
export const requestPlansFailed = (): FailedLoadAction => ({ type: PlanActionTypes.loadFailed });
export const removePlan = (id: string): RemovePlanAction => ({
  type: PlanActionTypes.remove,
  payload: id,
});
export const initializePlan = (plan: PlanYear): InitializePlanAction => ({
  type: PlanActionTypes.initialize,
  payload: plan,
});
