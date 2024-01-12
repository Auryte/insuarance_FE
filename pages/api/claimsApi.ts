import { AxiosResponse } from 'axios';

// Types
import { ClaimsData } from '@/types/adminTypes';
import { Claim } from '@/types/adminTypes';

// Utils
import { localClient } from '@/utils/axiosInstance';

type Props = {
  claimNumber?: string;
  employer?: string;
  selectStatus?: string;
  page?: number;
  rowsPerPage?: number;
};

export const getClaims = async ({
  claimNumber,
  employer,
  selectStatus,
  page,
  rowsPerPage,
}: Props): Promise<ClaimsData> => {
  const result: AxiosResponse<ClaimsData> = await localClient.get(
    `/claims?number=${claimNumber}&employer=${employer}&status=${selectStatus}&page=${page}&limit=${rowsPerPage}`,
  );
  return result.data;
};

export const updateClaim = async (id: string, data: any): Promise<Claim> => {
  const result: AxiosResponse<Claim> = await localClient.patch(`/claims/${id}`, {
    ...data,
  });
  return result.data;
};
