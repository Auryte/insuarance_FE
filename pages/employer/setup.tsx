import React, { ReactElement } from 'react';
import Head from 'next/head';

// Components
import Layout from '@/components/shared/EmployerNavLayout/Layout';
import SetupPage from '@/components/employer/SetupPage/SetupPage';

// Context
import { LogoUrlProvider } from '@/contexts/LogoUrlContext';

const EmployerSetupPage = () => (
  <div>
    <Head>
      <title>Employer Portal | Setup</title>
      <meta name="description" content="Employer setup page" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SetupPage />
  </div>
);

EmployerSetupPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LogoUrlProvider>
      <Layout>{page}</Layout>
    </LogoUrlProvider>
  );
};
export default EmployerSetupPage;
