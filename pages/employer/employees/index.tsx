import React, { ReactElement } from 'react';
import Head from 'next/head';

// Context
import { LogoUrlProvider } from '@/contexts/LogoUrlContext';

// Components
import Layout from '@/components/shared/EmployerNavLayout/Layout';
import EmployeeSearchPage from '@/components/employer/EmployeeSearchPage/EmployeeSearchPage';

const EmployeesPage = () => (
  <>
    <Head>
      <title>Employer Portal | Employees</title>
      <meta name="description" content="Employees page" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <EmployeeSearchPage />
  </>
);

EmployeesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LogoUrlProvider>
      <Layout>{page}</Layout>;
    </LogoUrlProvider>
  );
};

export default EmployeesPage;
