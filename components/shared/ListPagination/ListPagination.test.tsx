import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ListPagination from './ListPagination';

const mockedProps = {
  employersCount: 40,
  page: 1,
  limit: 10,
  handleChangePage: () => {},
  handleChangeRowsPerPage: () => {},
};

describe('Check if Empolyer List Pagination is rendered', () => {
  test('Check if Empolyer List Pagination is the document', () => {
    render(<ListPagination count={mockedProps.employersCount} {...mockedProps} />);
    const tablePagination = screen.getByTestId('table-pagination');
    expect(tablePagination).toBeInTheDocument();
  });
});
