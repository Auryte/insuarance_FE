import { AxiosResponse } from 'axios';

// Types
import { ManagePlanYearInputs } from '@/components/admin/EmployerTab/ManagePlanYear/ManagePlanYear';

// Utils
import { localClient } from '@/utils/axiosInstance';

// Types
import { PlanYear } from '@/types/insurance';

export const getPlanYears = async (employerId: string | undefined): Promise<PlanYear[]> => {
  const result: AxiosResponse<PlanYear[]> = await localClient.get(`/employers/${employerId}/plans`);
  return result.data;
};

export const createPlanYear = async (
  body: ManagePlanYearInputs,
  employerId: string,
): Promise<ManagePlanYearInputs> => {
  const result: AxiosResponse<PlanYear> = await localClient.post(
    `/employers/${employerId}/plans`,
    body,
  );
  return result.data;
};

export const updatePlanYear = async (
  body: ManagePlanYearInputs,
  employerId: string,
  planYearId: string,
): Promise<PlanYear> => {
  const result: AxiosResponse<PlanYear> = await localClient.patch(
    `/employers/${employerId}/plans/${planYearId}`,
    body,
  );
  return result.data;
};

export const initializePlanRequest = async (employerId: string, planYearId: string) => {
  const result: AxiosResponse<PlanYear> = await localClient.patch(
    `/employers/${employerId}/plans/${planYearId}/initialize`,
  );
  return result.data;
};

export const removePlanRequest = async (employerId: string, planYearId: string) => {
  const result: AxiosResponse<PlanYear> = await localClient.delete(
    `/employers/${employerId}/plans/${planYearId}`,
  );
  return result.data;
};
