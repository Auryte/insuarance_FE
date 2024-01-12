export const baseURL = 'http://localhost:8000';

interface IEndPoints {
  login: string;
  getEmployers: string;
}

export const apiEndPoints: IEndPoints = {
  login: '/users/login',
  getEmployers: '/employers',
};

export const TOKEN_LOCALSTORAGE_LABEL = 'token';
