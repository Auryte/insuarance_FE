import { Employer } from './employer';
import { PayrollFrequency } from './insurance';

export enum MainViews {
  employerSearch = 'employerSearch',
  addUpdateEmployer = 'addUpdateEmployer',
  administration = 'administration',
  manageProfile = 'manageProfile',
  manageUsers = 'manageUsers',
  manageUser = 'manageUser',
  manageRules = 'manageRules',
  managePlans = 'managePlans',
  managePlanYear = 'managePlanYear',
}

export enum SelectFilters {
  allClaims = 'All claims',
  denied = 'denied',
  approved = 'approved',
  pending = 'pending',
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface TabBaseStyles {
  minWidth: string;
  pr: string;
}

export interface TabsProps {
  label: string;
  sx: TabBaseStyles;
  onClick?: () => void;
}

export type Consumer = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  SSN: string;
  city: string;
  employerID: string;
  id: string;
  phone: string;
  state: string;
  street: string;
  zipCode: string;
};

export type Plan = {
  name: string;
  type: string;
  contributions: number;
  id: string;
  startDate: string;
  endDate: string;
  payrollFrequency: PayrollFrequency;
  employerId: string;
};

export type Claim = {
  amount: number;
  consumer: Consumer;
  consumerID: string;
  employer: Employer;
  id: string;
  number: string;
  plan: Plan;
  planID: string;
  startDate: string;
  status: string;
  changeViewToClaims?: (claim: undefined) => void;
};

export type MetaData = {
  numberOfDocuments: number;
  page: number;
  pageSize: number;
};

export type ClaimsData = {
  data: Claim[];
  metadata: MetaData[];
};
