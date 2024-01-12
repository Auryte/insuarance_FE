import React, { FC, Reducer, useContext, useEffect, useReducer, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

// Components
import MuiButton from '@/components/shared/MuiButton/MuiButton';
import EmployeeTable from '../EmployeeTable/EmployeeTable';
import { Box, Grid } from '@mui/material';
import ListPagination from '@/components/shared/ListPagination/ListPagination';

// API
import { getAllConsumers } from '@/pages/api/userApi';

// Utils
import {
  requestEmployee,
  requestEmployeeFailed,
  requestEmployeeSuccess,
  SearchEmployeeAction,
  searchEmployeeReducer,
} from './EmployeeSearchPage.utils';
import EmployeeSearchForm, { SearchFormInput } from '../EmployeeSearchForm/EmployeeSearchForm';

// Stiles
import { boxStyles } from '@/styles/styled';

// Types
import { EmployeesData } from '@/types/user';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

// Contexts
import { AuthContext } from '@/contexts/AuthContext';

export type SearchEmployeeState = {
  loading: boolean;
  state: EmployeesData | null;
};

type Options = {
  page: number;
  limit: number;
};

const SearchEmployerPage: FC = () => {
  const router = useRouter();
  const [employeeState, dispatch] = useReducer<Reducer<SearchEmployeeState, SearchEmployeeAction>>(
    searchEmployeeReducer,
    {
      loading: false,
      state: null,
    },
  );
  const [options, setOptions] = useState<Options>({
    page: 1,
    limit: 8,
  });
  const [filters, setFilters] = useState<SearchFormInput>({
    firstName: '',
    lastName: '',
    SSN: '',
  });
  const { handleErrors } = useErrorHandler();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        if (!user) return;

        const { employerID } = user;
        dispatch(requestEmployee());
        const response = await getAllConsumers({ employerID, ...options, ...filters });
        dispatch(requestEmployeeSuccess(response));
      } catch (err) {
        dispatch(requestEmployeeFailed());
        if (err instanceof AxiosError) {
          handleErrors(err, () => {});
        }
      }
    })();
  }, [options, filters, user]);

  const handleChangePage = (newPage: number): void => {
    setOptions({
      ...options,
      page: newPage + 1,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setOptions({
      limit: parseInt(event.target.value, 10),
      page: 1,
    });
  };

  const handleOnSubmit = (data: SearchFormInput) => {
    setFilters({ ...data });
    setOptions({
      ...options,
      page: 1,
    });
  };

  const handleAddNew = () => {
    router.push(router.route + '/add-employee');
  };

  return (
    <Box sx={{ px: 1 }}>
      <Box
        sx={{
          ...boxStyles,
          p: 3,
          height: {},
          '&::before': { ...boxStyles['&::before'], content: `"Search Employees"` },
        }}
      >
        <EmployeeSearchForm handleOnSubmit={handleOnSubmit} />
      </Box>
      <Grid container justifyContent={'flex-end'}>
        <MuiButton sx={{ mt: 3 }} onClick={handleAddNew} disabled={!user?.employer?.addConsumers}>
          Add New Employee
        </MuiButton>
      </Grid>
      {employeeState && (
        <>
          <EmployeeTable loading={employeeState.loading} state={employeeState.state} />
          {employeeState.state?.metadata[0] && (
            <ListPagination
              count={employeeState.state.metadata[0].numberOfDocuments}
              page={options.page}
              limit={options.limit}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default SearchEmployerPage;
