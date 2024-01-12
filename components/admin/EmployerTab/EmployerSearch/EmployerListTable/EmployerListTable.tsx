import * as React from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';

// Styles
import { StyledTableCell, StyledTableRow } from '@/styles/styled';

// Types
import { Employer } from '@/types/employer';

// Components
import TableRowSkeleton from '@/components/shared/TableRowSkeleton/TableRowSkeleton';

interface EmployerListTableProps {
  employers: Employer[];
  loading: boolean;
  employerClickHandler: (employer: Employer) => void;
}

const EmployerListTable: React.FC<EmployerListTableProps> = ({
  employers,
  loading,
  employerClickHandler,
}) => (
  <TableContainer sx={{ mt: 5 }}>
    <Table sx={{ minWidth: 500 }} size="small" aria-label="custom table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Employer Name</StyledTableCell>
          <StyledTableCell align="center">Employer Code</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody data-testid="employer-table-body">
        {loading ? (
          <TableRowSkeleton count={8} colSpan={2} />
        ) : employers.length === 0 ? (
          <StyledTableRow>
            <StyledTableCell colSpan={2} sx={{ cursor: 'auto' }}>
              No employers found
            </StyledTableCell>
          </StyledTableRow>
        ) : (
          <>
            {employers.map(employer => (
              <StyledTableRow data-testid="employer-row" key={employer.id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  onClick={() => employerClickHandler(employer)}
                >
                  {employer.name}
                </StyledTableCell>
                <StyledTableCell align="center">{employer.code}</StyledTableCell>
              </StyledTableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default EmployerListTable;
