import React, { FC, Reducer, useReducer } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';

// Types
import { UsersState } from './ManageUsers';

// Components
import TableRowSkeleton from '@/components/shared/TableRowSkeleton/TableRowSkeleton';

// Styles
import { StyledTableCell, StyledTableRow } from '@/styles/styled';
import { User, UsersData } from '@/types/user';
import { UsersAction, usersReducer } from './ManageUsers.utils';

type ManageUsersTableProps = {
  loading: boolean;
  state: UsersData | null;
  onClick: (user: User) => void;
};

const ManageUsersTable: FC<ManageUsersTableProps> = ({ loading, state, onClick }) => {
  const [usersState, dispatch] = useReducer<Reducer<UsersState, UsersAction>>(usersReducer, {
    loading,
    state,
  });

  return (
    <TableContainer sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 500 }} size="small" aria-label="table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Username</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && <TableRowSkeleton count={8} colSpan={3} />}
          {state && !state.data.length && !loading && (
            <StyledTableRow>
              <StyledTableCell colSpan={3} sx={{ cursor: 'auto' }}>
                No users found
              </StyledTableCell>
            </StyledTableRow>
          )}
          {state?.data.map(user => (
            <StyledTableRow key={user.id} sx={{ cursor: 'auto' }} onClick={() => onClick(user)}>
              <StyledTableCell>
                {user.firstName} {user.lastName}
              </StyledTableCell>
              <StyledTableCell align="left">{user.username}</StyledTableCell>
              <StyledTableCell align="left">{user.email}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageUsersTable;
