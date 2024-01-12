import React, { ReactElement } from 'react';
import Head from 'next/head';

// Context
import { LogoUrlProvider } from '@/contexts/LogoUrlContext';

// Components
import Layout from '@/components/shared/EmployerNavLayout/Layout';
import EmployeeProfileForm from '@/components/employer/EmployeeProfileForm/EmployeeProfileForm';

const EmployeeProfilePage = () => (
  <>
    <Head>
      <title>Employer Portal | Employee Profile</title>
      <meta name="description" content="Employee's profile page" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <EmployeeProfileForm />
  </>
);

EmployeeProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LogoUrlProvider>
      <Layout>{page}</Layout>
    </LogoUrlProvider>
  );
};

export default EmployeeProfilePage;
