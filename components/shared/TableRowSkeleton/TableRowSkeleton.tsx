import React, { FC } from 'react';
import { Skeleton, TableCell } from '@mui/material';

// Styles
import { StyledTableRow } from '@/styles/styled';

type TableRowSkeleton = {
  count: number;
  colSpan: number;
};

const TableRowSkeleton: FC<TableRowSkeleton> = ({ colSpan, count }) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <StyledTableRow key={i} sx={{ height: 48 }}>
        <TableCell colSpan={colSpan}>
          <Skeleton />
        </TableCell>
      </StyledTableRow>
    ))}
  </>
);

export default TableRowSkeleton;
