import { AxiosResponse } from 'axios';

// Types
import { ImageUpload } from '@/types/file';
import { User } from '@/types/user';

// Utils
import { localClient } from '@/utils/axiosInstance';

export const uploadImage = async (file: File): Promise<ImageUpload> => {
  const result: AxiosResponse<ImageUpload> = await localClient.post('/image/upload', file, {
    headers: {
      'Content-Type': `${file.type}`,
    },
  });
  return result.data;
};

export const uploadCsvData = async (
  data: Omit<User, 'id' | 'employer' | 'employerID'>,
  employerID: string,
): Promise<User[]> => {
  const result: AxiosResponse<User[]> = await localClient.post(
    `/users/${employerID}/users/upload-scv`,
    data,
  );
  return result.data;
};
