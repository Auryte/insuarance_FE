import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AxiosError } from 'axios';

// Components
import Navbar from '@/components/shared/Navbar/Navbar';

// Contexts
import { AuthContext } from '@/contexts/AuthContext';
import useErrorHandler from '@/hooks/useErrorHandler';
import EmployerContext, { EmployerContextData } from '@/contexts/EmployerContext';

// Hooks
import useGetMounted from '@/hooks/useGetMounted';

// Styles
import { Box, Button, Divider, Paper } from '@mui/material';
import { employerPortalLayoutWrapper, imageWrapper, navigationWrapper } from '@/styles/styled';

// Types
import { User, UserRole } from '@/types/user';
import { LogoUrlContext } from '@/contexts/LogoUrlContext';

// Api
import { getEmployer } from '@/pages/api/employerApi';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isUserAuthenticated, getUser, logout } = useContext(AuthContext);
  const { saveEmployer } = useContext<EmployerContextData>(EmployerContext);
  const { imageUrl, setImageUrl } = useContext(LogoUrlContext);
  const hasMounted = useGetMounted();
  const [user, setUser] = useState<User | null>(null);
  const { handleErrors } = useErrorHandler();

  useEffect(() => {
    const currentUser = getUser();
    currentUser && setUser(currentUser);
    if (!isUserAuthenticated() || currentUser?.role !== UserRole.employer) {
      router.push(currentUser ? `/${currentUser.role}` : '/');
    }
  }, [router, isUserAuthenticated]);

  useEffect(() => {
    const getCurrentEmployer = async () => {
      try {
        if (user?.employer) {
          const currentEmployer = await getEmployer(user.employer.id);
          saveEmployer(currentEmployer);
          setImageUrl(currentEmployer?.logo);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          handleErrors(error);
        }
      }
    };
    getCurrentEmployer();
  }, [user]);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {isUserAuthenticated() && user?.role === UserRole.employer && (
        <Paper sx={employerPortalLayoutWrapper}>
          <Box sx={navigationWrapper}>
            <Button variant="outlined" size="medium" sx={{ m: 1, height: '40px' }} onClick={logout}>
              Logout
            </Button>
            <Box sx={imageWrapper}>
              {imageUrl ? (
                <Image src={imageUrl} alt="Employer logo" width={160} height={80} priority={true} />
              ) : null}
            </Box>
            <Divider sx={{ width: 'calc(100% - 16px)', mb: 2, mx: 1 }} />
            <Navbar />
          </Box>
          {children}
        </Paper>
      )}
    </>
  );
};

export default Layout;
