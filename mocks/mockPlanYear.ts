import { PayrollFrequency, PlanType, PlanYear } from '@/types/insurance';

export const mockPlanYear: PlanYear = {
  name: 'TrainingFE',
  type: PlanType.dental,
  contributions: 234,
  startDate: '2022-12-13',
  endDate: '2022-12-14',
  payrollFrequency: PayrollFrequency.monthly,
  initialized: false,
  initializedAt: null,
  employerId: '6161a553-20f6-46ba-b7ca-7f6c55645708',
  id: 'bbe1ca2b-95e4-4a6c-90b8-ac9b8fd795e7',
};

export const mockInitializedPlanYear: PlanYear = {
  ...mockPlanYear,
  endDate: '2023-12-14T21:00:00.000Z',
  initialized: true,
  initializedAt: '2023-12-13T21:00:00.000Z',
  id: 'bbe1ca2b-95e4-4a6c-90b8-ac9b8fd795e8',
};

export const mockPlanYears: PlanYear[] = [mockPlanYear, mockInitializedPlanYear];
