import React from 'react';
import { render, screen, cleanup } from '@/test-utils/testing-library-utils';
import { waitFor, within } from '@testing-library/dom';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import userEvent from '@testing-library/user-event';
import EnrollmentsTable from '../EnrollmentsTable';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

afterEach(cleanup);
describe('Enrollments table', () => {
  it('should render the basic fields', async () => {
    useRouter.mockImplementation(() => ({
      route: '/employer/employees/[consumerId]',
      pathname: '/employer/employees/[consumerId]',
      query: { consumerId: 'f24ad404-f09a-4c4e-a3fe-74a775b2fed7' },
      asPath: '/employer/employees/f24ad404-f09a-4c4e-a3fe-74a775b2fed7',
    }));
    render(<EnrollmentsTable />);
    const enrollmentsButton = screen.getByText<HTMLElement>(/Add New Enrollment/i);
    const tableTitle = screen.getByText(/enrollments/i);
    const columnHeaderPlan = screen.getByRole('columnheader', { name: 'Plan' });
    const columnHeaderElection = screen.getByRole('columnheader', { name: 'Election' });
    const columnHeaderContribution = screen.getByRole('columnheader', { name: 'Contribution' });
    const columnHeaderUpdate = screen.getByRole('columnheader', { name: 'Update' });

    const elements = [
      enrollmentsButton,
      tableTitle,
      columnHeaderPlan,
      columnHeaderElection,
      columnHeaderContribution,
      columnHeaderUpdate,
    ];
    elements.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });

  it('should show an alert with error message if there is server error while getting enrollments', async () => {
    server.resetHandlers(
      rest.get(
        'http://localhost:8000/users/f24ad404-f09a-4c4e-a3fe-74a775b2fed7/enrollments',
        (req, res, ctx) => res(ctx.status(500)),
      ),
    );
    render(<EnrollmentsTable />);

    const alert = await screen.findByRole<HTMLInputElement>('alert');
    expect(alert).toBeInTheDocument();
    expect(
      await screen.findByRole<HTMLInputElement>('button', { name: 'Close' }),
    ).toBeInTheDocument();
  });

  it('should show an alert with error message if there is server error while getting consumer name', async () => {
    server.resetHandlers(
      rest.get(
        'http://localhost:8000/users/f24ad404-f09a-4c4e-a3fe-74a775b2fed7',
        (req, res, ctx) => res(ctx.status(500)),
      ),
    );
    render(<EnrollmentsTable />);

    const alert = await screen.findByRole<HTMLInputElement>('alert');
    expect(alert).toBeInTheDocument();
    expect(
      await screen.findByRole<HTMLInputElement>('button', { name: 'Close' }),
    ).toBeInTheDocument();
  });

  it('should show dialog form, when clicked on `Add New Enrollment` button', async () => {
    render(<EnrollmentsTable />);
    const enrollmentsButton = screen.getByText<HTMLElement>(/Add New Enrollment/i);
    expect(enrollmentsButton).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(enrollmentsButton);

    const dialog = await screen.findByRole<HTMLElement>('dialog');
    const title = await screen.findByText(/Add or Update enrollment/i);
    const closeIcon = await screen.findByTestId('CloseIcon');
    const closeButton = await screen.findByRole<HTMLInputElement>('button', { name: 'close' });
    const inputPlan = await screen.findByLabelText<HTMLSelectElement>(/Plan/i);
    const inputElection = await screen.findByLabelText<HTMLInputElement>(/Election/i);
    const textContribution = await screen.findByText(/Contribution:/i);
    const cancelButton = await screen.findByRole<HTMLButtonElement>('button', { name: 'Cancel' });
    const submitButton = await screen.findByRole<HTMLButtonElement>('button', { name: 'Submit' });

    const elements = [
      dialog,
      title,
      closeIcon,
      closeButton,
      inputPlan,
      inputElection,
      textContribution,
      cancelButton,
      submitButton,
    ];
    elements.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });

  it('should show dialog form, when clicked on `update` tableCell', async () => {
    render(<EnrollmentsTable />);
    const updateCell = screen.getAllByText<HTMLElement>(/Update/i);
    expect(updateCell[0]).toBeInTheDocument();
    const table = await screen.findByTestId('table');
    const tableRow = await within(table).findByRole('row', { name: /TrainingFE/i });
    const updateLink = await within(tableRow).findByText('Update');

    const user = userEvent.setup();
    await user.click(updateLink);

    const dialog = await screen.findByRole<HTMLElement>('dialog');
    const title = await screen.findByText(/Add or Update enrollment/i);
    const closeIcon = await screen.findByTestId('CloseIcon');
    const closeButton = await screen.findByRole<HTMLInputElement>('button', { name: 'close' });
    const inputPlan = await screen.findByLabelText<HTMLSelectElement>(/Plan/i);
    const inputElection = await screen.findByLabelText<HTMLInputElement>(/Election/i);
    const textContribution = await screen.findByText(/Contribution:/i);
    const cancelButton = await screen.findByRole<HTMLButtonElement>('button', { name: 'Cancel' });
    const submitButton = await screen.findByRole<HTMLButtonElement>('button', { name: 'Submit' });

    const elements = [
      dialog,
      title,
      closeIcon,
      closeButton,
      inputPlan,
      inputElection,
      textContribution,
      cancelButton,
      submitButton,
    ];
    elements.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });

  it('should close dialog form, when clicked on close button', async () => {
    render(<EnrollmentsTable />);
    const enrollmentsButton = screen.getByText<HTMLElement>(/Add New Enrollment/i);
    expect(enrollmentsButton).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(enrollmentsButton);

    const closeButton = await screen.findByRole<HTMLInputElement>('button', { name: 'close' });

    await user.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByTestId('enrollment-dialog')).not.toBeInTheDocument();
    });
  });

  it('should close dialog form, when clicked on `cencel` button', async () => {
    render(<EnrollmentsTable />);
    const enrollmentsButton = screen.getByText<HTMLElement>(/Add New Enrollment/i);
    expect(enrollmentsButton).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(enrollmentsButton);

    const closeButton = await screen.findByRole<HTMLInputElement>('button', { name: 'Cancel' });

    await user.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByTestId('enrollment-dialog')).not.toBeInTheDocument();
    });
  });
});
