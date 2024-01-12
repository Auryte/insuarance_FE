export enum PlanType {
  medical = 'medical',
  dental = 'dental',
}

export enum PayrollFrequency {
  weekly = 'weekly',
  monthly = 'monthly',
}

export type PlanYear = {
  id: string;
  name: string;
  type: PlanType;
  contributions: number;
  startDate: string;
  endDate: string;
  payrollFrequency: PayrollFrequency;
  initialized: boolean;
  initializedAt: string | null;
  employerId: string;
};
