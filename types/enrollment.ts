import { PlanYear } from './insurance';

export type Enrollment = {
  id?: string | null | undefined;
  consumerID: string | string[] | undefined;
  planID: string;
  election?: number | null;
  plan: PlanYear;
};

export type PlanTypeWithEnrollment = PlanYear & {
  id?: string | null | undefined;
  consumerID: string | string[] | undefined;
  planID: string;
  election?: number | null;
};

export type EnrollmentsDialogProps = {
  enrollments: Enrollment[];
  enrollment?: Enrollment;
  handleCancelModal: () => void;
  handleChange: (value: PlanYear | Enrollment) => void;
  open: boolean;
  plans: PlanYear[];
  onClose: () => void;
};
export type EnrollmentsFormInputs = {
  planName: string;
  election: number | null;
};

export type EnrollmentsUpdateData = {
  election: number | null;
  planID: string | undefined;
};
