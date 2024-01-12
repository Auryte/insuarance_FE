import { Dispatch, FC, useContext } from 'react';
import { Box, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { AxiosError } from 'axios';

// Contexts
import ViewsContext from '@/contexts/AdminViewsContext';
import EmployerContext from '@/contexts/EmployerContext';
import { PlanYearContext } from '@/contexts/PlanYearContext';
import { useSnackbar } from '@/contexts/SnackbarContext';

// Types
import { PlanYear } from '@/types/insurance';
import { MainViews } from '@/types/adminTypes';
import { SnackbarType } from '@/types/snackbar';
import { PlansState } from './ManagePlans';

// Api
import { removePlanRequest, initializePlanRequest } from '@/pages/api/planApi';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

// Components
import MuiButton from '@/components/shared/MuiButton/MuiButton';
import TableRowSkeleton from '@/components/shared/TableRowSkeleton/TableRowSkeleton';

// Styles
import { StyledTableCell, StyledTableRowAlternative } from '@/styles/styled';

// Utils
import { formatDate } from '@/utils/date';
import { removePlan, initializePlan, PlansAction } from './ManagePlans.utils';

type ManagePlansTableProps = {
  plansState: PlansState;
  dispatch: Dispatch<PlansAction>;
};

const ManagePlansTable: FC<ManagePlansTableProps> = ({
  plansState: { loading, data },
  dispatch,
}) => {
  const { setPlanYear } = useContext(PlanYearContext);
  const { setViewName } = useContext(ViewsContext);
  const { employer } = useContext(EmployerContext);
  const { showSnackbar } = useSnackbar();
  const { handleErrors } = useErrorHandler();

  const updatePlan = (plan: PlanYear) => {
    setPlanYear(plan);
    setViewName(MainViews.managePlanYear);
  };

  const removePlanByID = async (planYearID: string) => {
    if (!employer) return;
    try {
      await removePlanRequest(employer.id, planYearID);
      dispatch(removePlan(planYearID));
      showSnackbar('Plan deleted successfully.', SnackbarType.success);
    } catch (error) {
      if (error instanceof AxiosError) {
        handleErrors(error);
      }
    }
  };
  const initializePlanByID = async (planYearID: string) => {
    if (!employer) return;
    try {
      const response = await initializePlanRequest(employer.id, planYearID);
      response && dispatch(initializePlan(response));
      showSnackbar('Plan initialized successfully.', SnackbarType.success);
    } catch (error) {
      if (error instanceof AxiosError) {
        handleErrors(error);
      }
    }
  };

  return (
    <TableContainer sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 500 }} size="small" aria-label="table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ backgroundColor: 'red' }}>Name</StyledTableCell>
            <StyledTableCell align="left">Type</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && <TableRowSkeleton count={8} colSpan={4} />}
          {!loading && data && !data.length && (
            <StyledTableRowAlternative>
              <StyledTableCell colSpan={4} sx={{ cursor: 'auto' }}>
                No plans found
              </StyledTableCell>
            </StyledTableRowAlternative>
          )}
          {data &&
            data.map(plan => (
              <StyledTableRowAlternative key={plan.id} sx={{ cursor: 'auto' }}>
                <StyledTableCell>{plan.name}</StyledTableCell>
                <StyledTableCell style={{ width: 50 }} align="left">
                  {plan.type}
                </StyledTableCell>
                <StyledTableCell style={{ width: 200 }} align="left">
                  {plan.initialized && plan.initializedAt ? (
                    <>Initialized on {formatDate(plan.initializedAt)}</>
                  ) : (
                    <>Not initialized</>
                  )}
                </StyledTableCell>
                <StyledTableCell style={{ width: 400 }} align="left">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <MuiButton size="small" sx={{}} onClick={() => updatePlan(plan)}>
                      Update
                    </MuiButton>
                    {!plan.initialized && (
                      <>
                        <MuiButton size="small" sx={{}} onClick={() => removePlanByID(plan.id)}>
                          Remove
                        </MuiButton>
                        <MuiButton size="small" sx={{}} onClick={() => initializePlanByID(plan.id)}>
                          Initialize
                        </MuiButton>
                      </>
                    )}
                  </Box>
                </StyledTableCell>
              </StyledTableRowAlternative>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManagePlansTable;
