import React from 'react';
import { useRouter } from 'next/router';

// Components
import TableRowSkeleton from '@/components/shared/TableRowSkeleton/TableRowSkeleton';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';

// Styles
import { StyledTableCell, StyledTableRow } from '@/styles/styled';

// Utils
import { SearchEmployeeState } from '../EmployeeSearchPage/EmployeeSearchPage';

const EmployeeTable = ({ loading, state }: SearchEmployeeState) => {
  const router = useRouter();

  const handleClickRow = (id: string) => {
    router.push(router.route + '/' + id);
  };

  return (
    <TableContainer sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 500 }} size="small" aria-label="table">
        <TableHead>
          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell align="left">Last Name</StyledTableCell>
            <StyledTableCell align="left">SSN</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && <TableRowSkeleton count={8} colSpan={4} />}
          {state && !state.data.length && !loading && (
            <StyledTableRow>
              <StyledTableCell colSpan={4} sx={{ cursor: 'auto' }}>
                No employees found
              </StyledTableCell>
            </StyledTableRow>
          )}
          {state &&
            state.data.map(employee => (
              <StyledTableRow key={employee.id} onClick={() => handleClickRow(employee.id)}>
                <StyledTableCell align="left">{employee.firstName}</StyledTableCell>
                <StyledTableCell align="left">{employee.lastName}</StyledTableCell>
                <StyledTableCell align="left">{employee.SSN}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
