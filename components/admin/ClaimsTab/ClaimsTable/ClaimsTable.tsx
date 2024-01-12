import React, { FC } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';

// Types
import { Claim } from '@/types/adminTypes';

// Components
import TablePaginationActions from '@/components/shared/TablePaginationActions/TablePaginationActions';
import TableRowSkeleton from '@/components/shared/TableRowSkeleton/TableRowSkeleton';

// Utils
import { countEmptyRows } from './ClaimsTable.utils';
import { formatDate } from '@/utils/date';

// Styles
import { selectTableCell, StyledTableCell, StyledTableRowAlternative } from '@/styles/styled';

export type ClaimsTableProps = {
  claims: Claim[];
  claimsCount: number;
  loading: boolean;
  onClick: (claim: Claim) => void;
  onRowsChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, number: number) => void;
  rowsPerPage: number;
  page: number;
};

const ClaimsTable: FC<ClaimsTableProps> = props => {
  const { claims, claimsCount, loading, onClick, onRowsChange, onPageChange, rowsPerPage, page } =
    props;

  const claimsNotFoundRow = (
    <StyledTableRowAlternative>
      <StyledTableCell colSpan={7} sx={{ cursor: 'auto' }}>
        No claims found
      </StyledTableCell>
    </StyledTableRowAlternative>
  );

  return (
    <>
      <TableContainer sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 500 }} size="small" aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Claim Number</StyledTableCell>
              <StyledTableCell align="left">Consumer</StyledTableCell>
              <StyledTableCell align="left">Employer</StyledTableCell>
              <StyledTableCell align="left">Date of Service</StyledTableCell>
              <StyledTableCell align="left">Plan</StyledTableCell>
              <StyledTableCell align="left">Amount</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRowSkeleton count={8} colSpan={7} />
            ) : (
              claims?.map(claim => (
                <StyledTableRowAlternative key={claim.id}>
                  <StyledTableCell
                    style={{ width: 160 }}
                    onClick={() => onClick(claim)}
                    sx={selectTableCell}
                  >
                    {claim.number}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 200 }} align="left">
                    {claim.consumer.firstName + ' ' + claim.consumer.lastName}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 200 }} align="left">
                    {claim.employer.name}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 160 }} align="left">
                    {formatDate(claim.startDate)}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 104 }} align="left">
                    {claim.plan.type}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 80 }} align="left">
                    {claim.amount}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: 80 }} align="left">
                    {claim.status}
                  </StyledTableCell>
                </StyledTableRowAlternative>
              ))
            )}
            {claimsCount === 0 && !loading && claimsNotFoundRow}
            {countEmptyRows(page, rowsPerPage, claimsCount) > 0 && (
              <StyledTableRowAlternative
                style={{ height: 48 * countEmptyRows(page, rowsPerPage, claimsCount) }}
              >
                <StyledTableCell colSpan={7} />
              </StyledTableRowAlternative>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {claimsCount > 0 && (
        <TablePagination
          component="div"
          rowsPerPageOptions={[8, 10, 15, 25]}
          colSpan={7}
          count={claimsCount}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          }}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsChange}
          ActionsComponent={TablePaginationActions}
        />
      )}
    </>
  );
};

export default ClaimsTable;
