import { Enrollment } from '@/types/enrollment';
import { PayrollFrequency, PlanType } from '@/types/insurance';

export const mockEnrollments: Enrollment[] = [
  {
    id: 'f24ad404-f09a-4c4e-a3fe-74a775b2feee',
    consumerID: 'f24ad404-f09a-4c4e-a3fe-74a775b2fed7',
    planID: 'bbe1ca2b-95e4-4a6c-90b8-ac9b8fd795e7',
    election: 200,
    plan: {
      name: 'TrainingFE',
      type: PlanType.dental,
      contributions: 600,
      startDate: '2022-12-13T09:27:51.020Z',
      endDate: '2022-12-13T21:00:00.000Z',
      payrollFrequency: PayrollFrequency.monthly,
      initialized: false,
      initializedAt: null,
      employerId: '6161a553-20f6-46ba-b7ca-7f6c55645708',
      id: 'bbe1ca2b-95e4-4a6c-90b8-ac9b8fd795e7',
    },
  },
  {
    id: 'f24ad404-f09a-4c4e-a3fe-74a775b22222',
    consumerID: 'f24ad404-f09a-4c4e-a3fe-74a775b2fed7',
    planID: '4ab8dd7d-95f9-4671-ba4d-539b50476b96',
    election: 100,
    plan: {
      name: 'General Medical Insurance',
      type: PlanType.medical,
      contributions: 234,
      startDate: '2022-12-13T09:27:51.020Z',
      endDate: '2022-12-13T21:00:00.000Z',
      payrollFrequency: PayrollFrequency.weekly,
      initialized: false,
      initializedAt: null,
      employerId: '6161a553-20f6-46ba-b7ca-7f6c55645708',
      id: '4ab8dd7d-95f9-4671-ba4d-539b50476b96',
    },
  },
  {
    id: 'c0a290c9-b00d-4b19-b252-a54e6283e157',
    consumerID: 'f24ad404-f09a-4c4e-a3fe-74a775b2fed7',
    planID: '6720f2ab-cb5e-4785-970b-b21926f3a737',
    election: 500,
    plan: {
      name: 'My big uncuranse plan',
      type: PlanType.medical,
      contributions: 33,
      startDate: '2022-12-13T08:15:59.720Z',
      endDate: '2022-12-13T21:00:00.000Z',
      payrollFrequency: PayrollFrequency.weekly,
      initialized: false,
      initializedAt: null,
      employerId: '6161a553-20f6-46ba-b7ca-7f6c55645708',
      id: '6720f2ab-cb5e-4785-970b-b21926f3a737',
    },
  },
];

export const mockEnrollment: Enrollment = {
  id: 'f24ad404-f09a-4c4e-a3fe-74a775b2feee',
  consumerID: 'f24ad404-f09a-4c4e-a3fe-74a775b2fed7',
  planID: 'bbe1ca2b-95e4-4a6c-90b8-ac9b8fd795e7',
  election: 500,
  plan: {
    name: 'TrainingFE',
    type: PlanType.dental,
    contributions: 600,
    startDate: '2022-12-13T09:27:51.020Z',
    endDate: '2022-12-13T21:00:00.000Z',
    payrollFrequency: PayrollFrequency.monthly,
    initialized: false,
    initializedAt: null,
    employerId: '6161a553-20f6-46ba-b7ca-7f6c55645708',
    id: 'bbe1ca2b-95e4-4a6c-90b8-ac9b8fd795e7',
  },
};
