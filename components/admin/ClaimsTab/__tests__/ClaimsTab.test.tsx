import React from 'react';
import { render, screen } from '@/test-utils/testing-library-utils';
import { rest } from 'msw';
import { server } from '@/mocks/server';

import ClaimsTab from '../ClaimsTab';

describe('ClaimsTab', () => {
  it('should render the basic fields', async () => {
    render(<ClaimsTab />);
    const inputCode = screen.getByRole<HTMLInputElement>('textbox', { name: 'Claim Number' });
    const inputEmployer = screen.getByRole<HTMLInputElement>('textbox', { name: /Employer/i });
    const inputSelect = screen.getByText<HTMLInputElement>('Select Status');
    const buttonSubmit = screen.getByRole<HTMLElement>('button', { name: /Search/i });
    const table = screen.getByRole<HTMLElement>('table', { name: 'custom pagination table' });
    const columnHeaderNumber = screen.getByRole('columnheader', { name: 'Claim Number' });
    const columnHeaderConsumer = screen.getByRole('columnheader', { name: 'Consumer' });
    const columnHeaderEmployer = screen.getByRole('columnheader', { name: 'Employer' });
    const columnHeaderDate = screen.getByRole('columnheader', { name: /Date/i });
    const columnHeaderPlan = screen.getByRole('columnheader', { name: /Plan/i });
    const columnHeaderAmount = screen.getByRole('columnheader', { name: /Amount/i });
    const columnHeaderStatus = screen.getByRole('columnheader', { name: /Status/i });
    const elements = [
      inputCode,
      inputEmployer,
      inputSelect,
      buttonSubmit,
      table,
      columnHeaderNumber,
      columnHeaderConsumer,
      columnHeaderEmployer,
      columnHeaderDate,
      columnHeaderPlan,
      columnHeaderAmount,
      columnHeaderStatus,
    ];
    elements.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });

  it('should show an alert with error message if there is server error', async () => {
    server.resetHandlers(
      rest.get(
        'http://localhost:8000/claims?number=&employer=&status=&page=1&limit=5',
        (req, res, ctx) => res(ctx.status(500)),
      ),
    );
    render(<ClaimsTab />);

    const alert = await screen.findByRole<HTMLInputElement>('alert');
    expect(alert).toBeInTheDocument();
    expect(
      await screen.findByRole<HTMLInputElement>('button', { name: 'Close' }),
    ).toBeInTheDocument();
  });
});
