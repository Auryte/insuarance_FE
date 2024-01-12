import { AxiosResponse } from 'axios';

// Types
import { User, UsersData, EmployeesData } from '@/types/user';
import { EmployeeFormInputs } from '@/components/employer/EmployeeProfileForm/EmployeeProfileForm';

// Utils
import { localClient } from '@/utils/axiosInstance';

export const createConsumer = async (
  employerID: string | undefined,
  data: EmployeeFormInputs & { role: string },
): Promise<User> => {
  const result: AxiosResponse<User> = await localClient.post(`/users/${employerID}/users`, data);
  return result.data;
};

type GetEmployersParams = {
  employerID?: string;
  limit?: number;
  page?: number;
};

export const getAllEmployers = async ({
  employerID,
  limit = 10,
  page = 1,
}: GetEmployersParams): Promise<UsersData> => {
  const result: AxiosResponse<UsersData> = await localClient.get(
    `/employers/${employerID}/users?page=${page}&limit=${limit}`,
  );
  return result.data;
};

export const getConsumer = async (id: string | string[] | undefined): Promise<User> => {
  const result: AxiosResponse<User> = await localClient.get(`/users/${id}`);
  return result.data;
};

type GetConsumersParams = {
  employerID?: string;
  firstName?: string;
  lastName?: string;
  SSN?: string;
  limit?: number;
  page?: number;
};

export const getAllConsumers = async ({
  employerID,
  page = 1,
  limit = 10,
  ...params
}: GetConsumersParams): Promise<EmployeesData> => {
  let url = `/users/${employerID}/users?&page=${page}&limit=${limit}`;
  for (const prop in params) {
    const value = params[prop as keyof typeof params];
    if (value) {
      const queryParam = new URLSearchParams({ [prop]: value });
      url = url + '&' + queryParam.toString();
    }
  }
  const result: AxiosResponse<EmployeesData> = await localClient.get(url);
  return result.data;
};

export const updateConsumer = async (
  employerID: string | undefined,
  id: string | string[] | undefined,
  data: EmployeeFormInputs,
): Promise<User> => {
  const result: AxiosResponse<User> = await localClient.patch(`/users/${employerID}/users/${id}`, {
    ...data,
  });
  return result.data;
};

export const updateUserEmployer = async (id: string, data: User): Promise<User> => {
  const result: AxiosResponse<User> = await localClient.patch(`/users/${id}`, {
    ...data,
  });
  return result.data;
};

export const createUser = async (data: User, employerId: string): Promise<User> => {
  const result: AxiosResponse<User> = await localClient.post(`/users/${employerId}/users`, {
    ...data,
  });
  return result.data;
};
