import { Box, Grid } from '@mui/material';
import { FC, useContext, useEffect, useReducer, Reducer } from 'react';
import { AxiosError } from 'axios';

// Components
import EmployerTabTitle from '@/components/admin/EmployerTab/EmployerTabTitle/EmployerTabTitle';
import MuiButton from '@/components/shared/MuiButton/MuiButton';
import ManagePlansTable from './ManagePlanTable';

// Context
import ViewsContext from '@/contexts/AdminViewsContext';
import { PlanYearContext } from '@/contexts/PlanYearContext';
import EmployerContext from '@/contexts/EmployerContext';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

// Styles
import { boxStyles, gridBoxWrapper, gridWrapper } from '@/styles/styled';

// Api
import { getPlanYears } from '@/pages/api/planApi';

// Types
import { MainViews } from '@/types/adminTypes';
import { PlanYear } from '@/types/insurance';
import {
  PlansAction,
  plansReducer,
  requestPlans,
  requestPlansSuccess,
  requestPlansFailed,
} from './ManagePlans.utils';

export type PlansState = {
  loading: boolean;
  data: PlanYear[] | null;
};

const ManagePlans: FC = () => {
  const [plansState, dispatch] = useReducer<Reducer<PlansState, PlansAction>>(plansReducer, {
    loading: false,
    data: null,
  });
  const { setViewName } = useContext(ViewsContext);
  const { setPlanYear } = useContext(PlanYearContext);
  const { employer } = useContext(EmployerContext);
  const { handleErrors } = useErrorHandler();

  useEffect(() => {
    (async () => {
      if (!employer) return;
      try {
        dispatch(requestPlans());
        const planYears = await getPlanYears(employer.id);
        dispatch(requestPlansSuccess(planYears));
      } catch (error) {
        dispatch(requestPlansFailed());
        if (error instanceof AxiosError) {
          handleErrors(error);
        }
      }
    })();
  }, [employer, dispatch]);

  const addNewPlanYearHandler = () => {
    setPlanYear(null);
    setViewName(MainViews.managePlanYear);
  };

  return (
    <Box sx={gridBoxWrapper}>
      <EmployerTabTitle />
      <Grid
        container
        spacing={2}
        sx={{
          ...gridWrapper,
          mt: 1,
          ml: 0,
        }}
      >
        <Box
          sx={{
            ...boxStyles,
            px: 1,
            pb: 3,
            justifyContent: 'right',
            alignItems: 'flex-end',
            flexDirection: 'column',
            height: {},
            '&::before': { ...boxStyles['&::before'], content: `"Plan Years"` },
          }}
        >
          <MuiButton sx={{ width: '250px', mt: 3 }} onClick={addNewPlanYearHandler}>
            Add New Plan Year
          </MuiButton>
          <ManagePlansTable plansState={plansState} dispatch={dispatch} />
        </Box>
      </Grid>
    </Box>
  );
};

export default ManagePlans;
