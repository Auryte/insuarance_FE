import { FC } from 'react';
import TablePagination from '@mui/material/TablePagination';

interface ListPaginationProps {
  count: number;
  page: number;
  limit: number;
  handleChangePage: (page: number) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const ListPagination: FC<ListPaginationProps> = ({
  count,
  page,
  limit,
  handleChangePage,
  handleChangeRowsPerPage,
}) => (
  <TablePagination
    component="div"
    count={count}
    page={page - 1}
    onPageChange={(event, number) => handleChangePage(number)}
    rowsPerPage={limit}
    rowsPerPageOptions={[8, 10, 15, 25]}
    onRowsPerPageChange={event => handleChangeRowsPerPage(event)}
    showFirstButton={true}
    showLastButton={true}
    SelectProps={{
      inputProps: {
        'aria-label': 'rows per page',
      },
      native: true,
    }}
    data-testid="table-pagination"
  />
);

export default ListPagination;
