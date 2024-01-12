import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Box from '@mui/material/Box/Box';

// Context
import { LogoUrlProvider } from '@/contexts/LogoUrlContext';

// Components
import Layout from '@/components/shared/EmployerNavLayout/Layout';
import EnrollmentsTable from '@/components/employer/EnrollmentsTable/EnrollmentsTable';
import MuiButton from '@/components/shared/MuiButton/MuiButton';

// Styles
import { enrollmentsBoxStyles } from '@/styles/styled';

const EmployeeEnrollmentsPage = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Employer Portal | Employee Enrollments</title>
        <meta name="description" content="Employee's enrollments page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ px: 1 }}>
        <Box sx={enrollmentsBoxStyles}>
          <EnrollmentsTable />
          <MuiButton
            variant="outlined"
            sx={{ width: 'fit-content', mx: 1, my: 4 }}
            onClick={handleBackClick}
          >
            Back to Employee Management
          </MuiButton>
        </Box>
      </Box>
    </>
  );
};

EmployeeEnrollmentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LogoUrlProvider>
      <Layout>{page}</Layout>
    </LogoUrlProvider>
  );
};

export default EmployeeEnrollmentsPage;
