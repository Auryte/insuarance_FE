import React, { ReactElement } from 'react';
import Head from 'next/head';

// Components
import Layout from '@/components/shared/EmployerNavLayout/Layout';
import EmployeeProfileForm from '@/components/employer/EmployeeProfileForm/EmployeeProfileForm';

// Context
import { LogoUrlProvider } from '@/contexts/LogoUrlContext';

const AddEmployeePage = () => (
  <>
    <Head>
      <title>Employer Portal | Add Employee</title>
      <meta name="description" content="Add employee page" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <EmployeeProfileForm />
  </>
);

AddEmployeePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LogoUrlProvider>
      <Layout>{page}</Layout>
    </LogoUrlProvider>
  );
};

export default AddEmployeePage;
