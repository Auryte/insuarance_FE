import React, { FC, useContext } from 'react';
// Contexts
import ViewsContext from '@/contexts/AdminViewsContext';
import EmployerContext, { EmployerContextData } from '@/contexts/EmployerContext';
// Styles
import { Button, Box, Typography, Grid, Divider } from '@mui/material';
import { gridBoxWrapper, gridWrapper, headingWrapper } from '@/styles/styled';
// Types
import { MainViews } from '@/types/adminTypes';
// Utils
import { capitalizeFirstLetter } from '@/utils/stringCorrections';
import EmployerTabTitle from '@/components/admin/EmployerTab/EmployerTabTitle/EmployerTabTitle';

const EmployerManagement: FC = () => {
  const { setViewName } = useContext(ViewsContext);
  const ButtonsNames = ['manageProfile', 'manageUsers', 'manageRules'] as const;
  type ButtonTypes = typeof ButtonsNames[number];

  const employerSetupButtons = ButtonsNames.map((name: ButtonTypes, index: number) => (
    <Grid item xs={12} key={index}>
      <Button
        variant="contained"
        size="medium"
        onClick={() => handleClick(name)}
        sx={{ width: '250px' }}
      >
        {capitalizeFirstLetter(name)}
      </Button>
    </Grid>
  ));

  const handleClick = (name: ButtonTypes): void => {
    if (ButtonsNames.some((type: ButtonTypes) => type === name)) {
      setViewName(MainViews[name]);
    }
  };

  return (
    <Box sx={gridBoxWrapper}>
      <EmployerTabTitle />
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid container item xs={12} md={4} spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              Employer Setup
            </Typography>
          </Grid>
          {employerSetupButtons}
        </Grid>
        <Grid container item xs={12} md={4} spacing={3} alignContent="start">
          <Grid item xs={12} sx={{ height: '46px' }}>
            <Typography variant="h6" component="h2">
              Plan Setup
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ height: '57px' }}>
            <Button
              variant="contained"
              size="medium"
              onClick={() => setViewName(MainViews.managePlans)}
              sx={{ width: '250px' }}
            >
              Manage Plans
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployerManagement;
