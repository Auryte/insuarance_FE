import React from 'react';
import { render, screen } from '@/test-utils/testing-library-utils';
import { findByText, fireEvent, getByTestId, waitFor } from '@testing-library/dom';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import userEvent from '@testing-library/user-event';
import EnrollmentsDialogForm from '../EnrollmentsDialogForm';
import { mockEnrollment, mockEnrollments } from '@/mocks/mockEnrollments';
import { mockPlans } from '@/mocks/mockPlans';

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

describe('Enrollments dialog form', () => {
  it('should render the basic fields', async () => {
    useRouter.mockImplementation(() => ({
      route: '/employer/employees/[consumerId]',
      pathname: '/employer/employees/[consumerId]',
      query: { consumerId: 'f24ad404-f09a-4c4e-a3fe-74a775b2fed7' },
      asPath: '/employer/employees/f24ad404-f09a-4c4e-a3fe-74a775b2fed7',
    }));
    const handleCancelModal = jest.fn();
    const handleChange = jest.fn();
    const onClose = jest.fn();
    render(
      <EnrollmentsDialogForm
        enrollments={mockEnrollments}
        enrollment={mockEnrollment}
        handleCancelModal={handleCancelModal}
        handleChange={handleChange}
        open
        plans={mockPlans}
        onClose={onClose}
      />,
    );
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

  it('should close dialog form, and show success message when clicked on `Submit` button', async () => {
    const handleCancelModal = jest.fn();
    const handleChange = jest.fn();
    const onClose = jest.fn();
    render(
      <EnrollmentsDialogForm
        enrollments={mockEnrollments}
        enrollment={mockEnrollment}
        handleCancelModal={handleCancelModal}
        handleChange={handleChange}
        open
        plans={mockPlans}
        onClose={onClose}
      />,
    );
    const user = userEvent.setup();
    const submitButton = await screen.findByRole<HTMLButtonElement>('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
    await user.click(submitButton);

    await waitFor(() => {
      const successMsg = screen.getByText(/Enrollments updated successfully./i);
      expect(successMsg).toBeVisible();
    });
  });

  it('should show error message on submit when there is server error', async () => {
    server.resetHandlers(
      rest.patch(
        'http://localhost:8000/users/f24ad404-f09a-4c4e-a3fe-74a775b2fed7/enrollments/:id',
        (req, res, ctx) => res(ctx.status(500)),
      ),
    );
    const handleCancelModal = jest.fn();
    const handleChange = jest.fn();
    const onClose = jest.fn();
    render(
      <EnrollmentsDialogForm
        enrollments={mockEnrollments}
        enrollment={mockEnrollment}
        handleCancelModal={handleCancelModal}
        handleChange={handleChange}
        open
        plans={mockPlans}
        onClose={onClose}
      />,
    );
    const user = userEvent.setup();
    const submitButton = await screen.findByRole<HTMLButtonElement>('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
    await user.click(submitButton);

    await waitFor(() => {
      const alert = screen.getAllByRole('presentation');
      expect(alert[0]).toBeInTheDocument();
      const errorMsg = screen.getByText(/Request failed with status code 500/i);
      expect(errorMsg).toBeInTheDocument();
    });
  });
});
