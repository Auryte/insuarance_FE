import React, { FC, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import AdminTabs from '@/components/admin/AdminTabs/AdminTabs';

// Contexts
import { ViewsProvider } from '@/contexts/AdminViewsContext';
import { AuthContext } from '@/contexts/AuthContext';

// Hooks
import useGetMounted from '@/hooks/useGetMounted';

// Types
import { User, UserRole } from '@/types/user';

const Admin: FC = () => {
  const router = useRouter();
  const { isUserAuthenticated, getUser } = useContext(AuthContext);
  const hasMounted = useGetMounted();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getUser();
    currentUser && setUser(currentUser);
    if (!isUserAuthenticated() || currentUser?.role !== UserRole.admin) {
      router.push(currentUser ? `/${currentUser.role}` : '/');
    }
  }, [router, isUserAuthenticated]);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {isUserAuthenticated() && user?.role === UserRole.admin && (
        <>
          <Head>
            <title>Admin</title>
            <meta name="description" content="Administration page" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ViewsProvider>
            <AdminTabs />
          </ViewsProvider>
        </>
      )}
    </>
  );
};

export default Admin;
