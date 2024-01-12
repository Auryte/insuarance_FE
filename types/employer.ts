export type Employer = {
  id: string;
  name: string;
  code: string;
  street: string;
  city: string;
  state?: string;
  zipCode?: string;
  phone: string;
  logo?: string;
  addConsumers: boolean;
  claimFilling: boolean;
};

export type EmployerSearchQuery = {
  name?: string;
  code?: string;
  page?: number;
  limit?: string;
};

export type EmployerSearchFields = Partial<Pick<Employer, 'name' | 'code'>>;

export type EmployerSetup = {
  addConsumers?: boolean;
  claimFilling: boolean;
};
