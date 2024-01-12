import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Services
import { getFromLocalStorage } from '@/services/localStorage';

// Constants
import { baseURL, TOKEN_LOCALSTORAGE_LABEL } from '@/constants/constants';

export const localClient: AxiosInstance = axios.create({
  baseURL,
  headers: {},
});

localClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const accessToken: string | null | undefined = getFromLocalStorage(TOKEN_LOCALSTORAGE_LABEL);
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    Promise.reject((error as Error).message);
  },
);
