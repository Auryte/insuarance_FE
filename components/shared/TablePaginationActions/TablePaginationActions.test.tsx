import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@/test-utils/testing-library-utils';
import TablePaginationActions from './TablePaginationActions';

describe('TablePginationActions tests appearance', () => {
  test('It should render the basic fields', async () => {
    render(
      <TablePaginationActions
        count={18}
        page={1}
        rowsPerPage={10}
        onPageChange={function (
          event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
          newPage: number,
        ): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );
    const iconArrowLeft = screen.getByTestId<HTMLInputElement>('KeyboardArrowLeftIcon');
    const iconArrowRight = screen.getByTestId<HTMLInputElement>('KeyboardArrowRightIcon');
    const iconFirstPage = screen.getByTestId<HTMLInputElement>('FirstPageIcon');
    const iconLastPage = screen.getByTestId<HTMLElement>('LastPageIcon');

    const elements = [iconArrowLeft, iconArrowRight, iconFirstPage, iconLastPage];
    elements.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });
});
