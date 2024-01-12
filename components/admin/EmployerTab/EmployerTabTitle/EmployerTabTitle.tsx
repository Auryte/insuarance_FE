import ViewsContext from '@/contexts/AdminViewsContext';
import { gridWrapper, headingWrapper } from '@/styles/styled';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import EmployerContext, { EmployerContextData } from '@/contexts/EmployerContext';
import { MainViews } from '@/types/adminTypes';

const EmployerTabTitle: FC = () => {
  const { setViewName } = useContext(ViewsContext);
  const { employer, saveEmployer } = useContext<EmployerContextData>(EmployerContext);

  const handleSelectDifferent = () => {
    setViewName(MainViews.employerSearch);
    saveEmployer(undefined);
  };

  return (
    <>
      <Grid container item sx={{ ...gridWrapper, mt: -3 }}>
        <Typography variant="h6" component="h1" sx={headingWrapper}>
          Employer Administration for "{employer?.name}"
        </Typography>
        <Button variant="contained" size="medium" onClick={() => handleSelectDifferent()}>
          Select Different Employer
        </Button>
      </Grid>
      <Divider />
    </>
  );
};

export default EmployerTabTitle;
