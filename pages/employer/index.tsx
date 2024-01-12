import React, { ReactElement, useContext } from 'react';
import Head from 'next/head';

// Components
import Layout from '@/components/shared/EmployerNavLayout/Layout';
import EmployerProfile from '../../components/employer/EmployerProfile/EmployerProfile';

// Context
import { LogoUrlProvider } from '@/contexts/LogoUrlContext';
import EmployerContext, { EmployerContextData } from '@/contexts/EmployerContext';

const EmployerHomePage = () => {
  const { employer, saveEmployer } = useContext<EmployerContextData>(EmployerContext);

  return (
    <>
      <Head>
        <title>Employer Portal | Home</title>
        <meta name="description" content="Employer home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EmployerProfile employer={employer} setEmployer={saveEmployer} />
    </>
  );
};

EmployerHomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LogoUrlProvider>
      <Layout>{page}</Layout>
    </LogoUrlProvider>
  );
};

export default EmployerHomePage;
