import { mockEnrollments } from '@/mocks/mockEnrollments';
import { mockPlans } from '@/mocks/mockPlans';
import { PayrollFrequency, PlanType } from '@/types/insurance';
import '@testing-library/jest-dom';
import { filterNotUsedPlans } from '../EnrollmentsTable.utils';

describe('EnrollmentsTable utils', () => {
  test('It should filter only the plans which user is not using ', () => {
    expect(filterNotUsedPlans(mockPlans, mockEnrollments)).toEqual([
      {
        name: 'Plan I',
        type: PlanType.dental,
        contributions: 200,
        startDate: '2022-12-13T09:27:51.020Z',
        endDate: '2022-12-14T21:00:00.000Z',
        payrollFrequency: PayrollFrequency.monthly,
        initialized: false,
        initializedAt: null,
        employerId: '6161a553-20f6-46ba-b7ca-7f6c55645708',
        id: 'bbe1ca2b-95e4-4a6c-90b8-ac9b8fd79999',
      },
    ]);
  });
});
