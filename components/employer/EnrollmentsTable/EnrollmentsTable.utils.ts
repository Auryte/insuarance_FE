import { Enrollment } from '@/types/enrollment';
import { PlanYear } from '@/types/insurance';
import { User } from '@/types/user';

export const filterNotUsedPlans = (
  result: PlanYear[],
  enrollments: Enrollment[] | null,
): PlanYear[] =>
  result.filter(plan => {
    const findConsumerPlan = enrollments?.find(enroll => enroll.planID === plan.id);
    return !findConsumerPlan && plan;
  });

export const getName = (user: User): string => user.firstName + ' ' + user.lastName;
