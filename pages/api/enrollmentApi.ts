import { AxiosResponse } from 'axios';

// Types
import { Enrollment, EnrollmentsUpdateData } from '@/types/enrollment';

// Utils
import { localClient } from '@/utils/axiosInstance';

export const getEnrollments = async (
  consumerID: string | string[] | undefined,
): Promise<Enrollment[]> => {
  const result: AxiosResponse<Enrollment[]> = await localClient.get(
    `/users/${consumerID}/enrollments`,
  );
  return result.data;
};

export const updateEnrollment = async (
  consumerID: string | string[] | undefined,
  id: string | null | undefined,
  data: EnrollmentsUpdateData,
): Promise<Enrollment[]> => {
  const result: AxiosResponse<Enrollment[]> = await localClient.patch(
    `/users/${consumerID}/enrollments/${id}`,
    { ...data },
  );
  return result.data;
};

export const createEnrollment = async (
  consumerID: string | string[] | undefined,
  data: EnrollmentsUpdateData,
): Promise<Enrollment[]> => {
  const result: AxiosResponse<Enrollment[]> = await localClient.post(
    `/users/${consumerID}/enrollments`,
    { ...data },
  );
  return result.data;
};
