import { AxiosResponse } from 'axios';

// Types
import { EmployerFormInputs } from '@/components/admin/EmployerTab/AddUpdateEmployer/AddUpdateEmployer';
import { Employer, EmployerSetup } from '@/types/employer';

// Utils
import { localClient } from '@/utils/axiosInstance';

export const createEmployer = async (data: EmployerFormInputs): Promise<Employer> => {
  const result: AxiosResponse<Employer> = await localClient.post('/employers', {
    ...data,
  });
  return result.data;
};

export const updateEmployer = async (id: string, data: EmployerFormInputs): Promise<Employer> => {
  const result: AxiosResponse<Employer> = await localClient.patch(`/employers/${id}`, {
    ...data,
  });
  return result.data;
};

export const updateEmployerSetup = async (
  id: string | undefined,
  data: EmployerSetup,
): Promise<Employer> => {
  const result: AxiosResponse<Employer> = await localClient.patch(`/employers/${id}/manage-rules`, {
    ...data,
  });
  return result.data;
};

export const getEmployer = async (id: string): Promise<Employer | undefined> => {
  const result: AxiosResponse<Employer> = await localClient.get(`/employers/${id}`);
  return result.data;
};
