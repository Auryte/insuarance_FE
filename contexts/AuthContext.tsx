import { createContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import jwtDecode from 'jwt-decode';

// Types
import { User } from '@/types/user';

// Services
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveInLocalStorage,
} from '@/services/localStorage';

// Constants
import { apiEndPoints, TOKEN_LOCALSTORAGE_LABEL } from '@/constants/constants';

// Utils
import { localClient } from '@/utils/axiosInstance';

type AuthProviderProps = {
  children?: ReactNode;
};

export interface IAuthContext {
  user: User | undefined;
  login: (username: string, password: string) => Promise<void>;
  isUserAuthenticated: () => boolean;
  getUser: () => User | undefined;
  logout: () => void;
}

const initialValue: IAuthContext = {
  user: undefined,
  login: async (): Promise<void> => {},
  isUserAuthenticated: () => false,
  getUser: () => undefined,
  logout: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(initialValue.user);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const res = await localClient.post(apiEndPoints.login, {
        username: username,
        password: password,
      });

      if (Math.trunc(res.status / 100) === 2) {
        const userData = res.data;
        const { token } = userData;
        saveInLocalStorage(TOKEN_LOCALSTORAGE_LABEL, token);
        const data = jwtDecode(token) as { user: User };
        const loggedUser = data.user;
        setUser(loggedUser);
        const role = loggedUser.role;
        router.push(role);
      } else {
        throw new Error('Unable to login.');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
    }
  };

  const getUser = () => {
    const token = getFromLocalStorage(TOKEN_LOCALSTORAGE_LABEL);
    const data = token && (jwtDecode(token) as { user: User });
    const loggedUser = data && data.user;
    return loggedUser || undefined;
  };

  const logout = () => {
    deleteFromLocalStorage(TOKEN_LOCALSTORAGE_LABEL);
    router.push('/');
  };

  const isUserAuthenticated = (): boolean => {
    const token = getFromLocalStorage(TOKEN_LOCALSTORAGE_LABEL);
    return token ? true : false;
  };

  return (
    <AuthContext.Provider value={{ user, login, isUserAuthenticated, getUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
