import React from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { mockDecodedToken } from './mockUser';

const MockAuthProvider = ({ children }: { children: React.ReactNode }) => (
  <AuthContext.Provider
    value={{
      getUser: () => undefined,
      user: mockDecodedToken,
      login: async (): Promise<void> => {},
      isUserAuthenticated: () => false,
      logout: () => {},
    }}
  >
    {children}
  </AuthContext.Provider>
);
export default MockAuthProvider;
