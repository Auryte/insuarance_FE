import { MetaData, Consumer } from './adminTypes';
import { Employer } from './employer';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  SSN?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  employerID?: string;
  employer?: Employer;
  password?: string;
}

export enum UserRole {
  admin = 'admin',
  employer = 'employer',
  consumer = 'consumer',
}

export type UsersData = {
  data: User[];
  metadata: MetaData[];
};

export type EmployeesData = {
  data: Consumer[];
  metadata: MetaData[];
};
