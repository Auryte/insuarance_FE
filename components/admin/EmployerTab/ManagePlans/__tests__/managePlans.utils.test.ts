import { mockInitializedPlanYear, mockPlanYears } from '@/mocks/mockPlanYear';
import { PlanActionTypes, plansReducer } from '../ManagePlans.utils';

describe('Plans reducer', () => {
  test('request get plans start', () => {
    expect(
      plansReducer(
        {
          loading: false,
          data: null,
        },
        { type: PlanActionTypes.loadStart },
      ),
    ).toEqual({
      loading: true,
      data: null,
    });
  });

  test('request get plans success', () => {
    expect(
      plansReducer(
        {
          loading: false,
          data: null,
        },
        { type: PlanActionTypes.loadSuccess, payload: mockPlanYears },
      ),
    ).toEqual({
      loading: false,
      data: mockPlanYears,
    });
  });

  test('request get plans failed', () => {
    expect(
      plansReducer(
        {
          loading: false,
          data: null,
        },
        { type: PlanActionTypes.loadFailed },
      ),
    ).toEqual({
      loading: false,
      data: null,
    });
  });

  test('initialize plan', () => {
    expect(
      plansReducer(
        {
          loading: false,
          data: mockPlanYears,
        },
        {
          type: PlanActionTypes.initialize,
          payload: { ...mockInitializedPlanYear, id: 'bbe1ca2b-95e4-4a6c-90b8-ac9b8fd795e7' },
        },
      ),
    ).toEqual({
      loading: false,
      data: [
        { ...mockInitializedPlanYear, id: 'bbe1ca2b-95e4-4a6c-90b8-ac9b8fd795e7' },
        mockPlanYears[1],
      ],
    });
  });

  test('remove plan', () => {
    expect(
      plansReducer(
        {
          loading: false,
          data: mockPlanYears,
        },
        { type: PlanActionTypes.remove, payload: mockPlanYears[0].id },
      ),
    ).toEqual({
      loading: false,
      data: [mockPlanYears[1]],
    });
  });

  test('default case', () => {
    expect(
      plansReducer(
        {
          loading: false,
          data: mockPlanYears,
        },
        { type: 'blabla' as PlanActionTypes.loadStart },
      ),
    ).toEqual({
      loading: false,
      data: mockPlanYears,
    });
  });
});
