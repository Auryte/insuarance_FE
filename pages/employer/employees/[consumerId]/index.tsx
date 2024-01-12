import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box, Typography, Grid } from '@mui/material';

// Components
import Layout from '@/components/shared/EmployerNavLayout/Layout';
import MuiButton from '@/components/shared/MuiButton/MuiButton';

// Context
import { LogoUrlProvider } from '@/contexts/LogoUrlContext';

const EmployeeManagePage = () => {
  const router = useRouter();

  const handleClickManageProfile = () => {
    router.push({
      pathname: router.route + '/profile',
      query: {
        consumerId: router.query.consumerId,
      },
    });
  };

  const handleClickManageEnrollments = () => {
    router.push({
      pathname: router.route + '/enrollments',
      query: {
        consumerId: router.query.consumerId,
      },
    });
  };

  return (
    <>
      <Head>
        <title>Employer Portal | Employee Management</title>
        <meta name="description" content="Employee's management page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ mx: 1, mt: 4 }}>
        <Grid container item xs={12} md={4} spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              Employee Setup
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MuiButton
              variant="contained"
              sx={{ width: '250px' }}
              onClick={handleClickManageProfile}
            >
              Manage Profile
            </MuiButton>
          </Grid>
          <Grid item xs={12}>
            <MuiButton size="medium" sx={{ width: '250px' }} onClick={handleClickManageEnrollments}>
              Manage Enrollments
            </MuiButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

EmployeeManagePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LogoUrlProvider>
      <Layout>{page}</Layout>
    </LogoUrlProvider>
  );
};

export default EmployeeManagePage;
