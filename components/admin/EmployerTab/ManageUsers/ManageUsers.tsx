import React, { FC, Reducer, useContext, useEffect, useReducer, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { AxiosError } from 'axios';

// Context
import EmployerContext from '@/contexts/EmployerContext';

// Types
import { User, UsersData } from '@/types/user';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

// Components
import EmployerTabTitle from '../EmployerTabTitle/EmployerTabTitle';
import ManageUsersTable from './ManageUsersTable';
import ListPagination from '@/components/shared/ListPagination/ListPagination';
import ManageUserForm from '../ManageUser/ManageUserForm';
import MuiButton from '@/components/shared/MuiButton/MuiButton';

// Api
import { getAllEmployers } from '@/pages/api/userApi';

// Styles
import { gridWrapper, gridBoxWrapper, boxStylesAlternative, boxStyles } from '@/styles/styled';

// Utils
import {
  UsersAction,
  usersReducer,
  requestUsers,
  requestUsersSuccess,
  requestUsersFailed,
} from './ManageUsers.utils';

export type UsersState = {
  loading: boolean;
  state: UsersData | null;
};

type Options = {
  page: number;
  limit: number;
};

const ManageUsers: FC = () => {
  const { employer } = useContext(EmployerContext);
  const { handleErrors } = useErrorHandler();
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isReloading, setIsReloading] = useState(false);

  const [usersState, dispatch] = useReducer<Reducer<UsersState, UsersAction>>(usersReducer, {
    loading: false,
    state: null,
  });
  const [options, setOptions] = useState<Options>({
    page: 1,
    limit: 8,
  });

  useEffect(() => {
    (async () => {
      if (!employer) return;
      try {
        dispatch(requestUsers());
        const response = await getAllEmployers({
          employerID: employer.id,
          ...options,
        });
        dispatch(requestUsersSuccess(response));
      } catch (error) {
        dispatch(requestUsersFailed());
        if (error instanceof AxiosError) {
          handleErrors(error);
        }
      }
    })();
  }, [employer, options, isReloading]);

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

  const handleAddNewClick = () => {
    setIsFormOpen(true);
  };

  const handleUserClick = (user: User) => {
    setIsFormOpen(true);
    setSelectedUser(user);
  };

  const handleCancelClick = () => {
    setIsFormOpen(false);
    setSelectedUser(undefined);
  };

  const handleReload = () => {
    setIsReloading(!isReloading);
  };

  return (
    <>
      {!isFormOpen ? (
        <Box sx={{ ...gridBoxWrapper, textAlign: 'right' }}>
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
                '&::before': { ...boxStyles['&::before'], content: `"Users"` },
              }}
            >
              <MuiButton sx={{ ml: 3, mt: 4 }} onClick={handleAddNewClick}>
                Add New User
              </MuiButton>
              <ManageUsersTable
                loading={usersState.loading}
                state={usersState.state}
                onClick={handleUserClick}
              />
              {usersState.state?.metadata[0] && (
                <ListPagination
                  count={usersState.state.metadata[0].numberOfDocuments}
                  page={options.page}
                  limit={options.limit}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
              )}
            </Box>
          </Grid>
        </Box>
      ) : (
        <ManageUserForm
          selectedUser={selectedUser}
          handleClick={handleCancelClick}
          handleReload={handleReload}
        />
      )}
    </>
  );
};

export default ManageUsers;
