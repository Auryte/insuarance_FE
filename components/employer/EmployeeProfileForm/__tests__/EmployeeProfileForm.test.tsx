import React from 'react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

// Contexts
import { AuthContext } from '@/contexts/AuthContext';

// Components
import EmployeeProfileForm from '../EmployeeProfileForm';

// Mocks
import { server } from '@/mocks/server';
import { mockDecodedToken } from '@/mocks/mockUser';

// Utils
import { act, render, screen, waitFor } from '@/test-utils/testing-library-utils';
import { mockAlert } from '@/utils/testUtils';

// Constants
import { baseURL } from '@/constants/constants';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({
  route: '/employer/employees/[consumerId]',
  pathname: '/employer/employees/[consumerId]',
  query: { consumerId: 'f24ad404-f09a-4c4e-a3fe-74a775b2fed7' },
}));

describe('EmployeeProfileForm', () => {
  const EmployeeProfileFormWithContexts = () => (
    <AuthContext.Provider
      value={{
        getUser: () => undefined,
        user: mockDecodedToken,
        login: async (): Promise<void> => {},
        isUserAuthenticated: () => false,
        logout: () => {},
      }}
    >
      <EmployeeProfileForm />
    </AuthContext.Provider>
  );

  it('should render successfully', () => {
    render(<EmployeeProfileFormWithContexts />);
    const inputFirstName = screen.getByRole<HTMLInputElement>('textbox', { name: /First Name/i });
    const inputLastName = screen.getByRole<HTMLInputElement>('textbox', { name: /Last Name/i });
    const inputUsername = screen.getByRole<HTMLInputElement>('textbox', { name: /Username/i });
    const inputEmail = screen.getByRole<HTMLInputElement>('textbox', { name: /Email/i });
    const inputPhone = screen.getByRole<HTMLInputElement>('textbox', { name: /Phone/i });
    const inputSSN = screen.getByRole<HTMLInputElement>('textbox', { name: /SSN/i });
    const inputStreet = screen.getByRole<HTMLInputElement>('textbox', { name: /Street/i });
    const inputCity = screen.getByRole<HTMLInputElement>('textbox', { name: /City/i });
    const inputState = screen.getByRole<HTMLInputElement>('textbox', { name: /State/i });
    const inputZipCode = screen.getByRole<HTMLInputElement>('textbox', { name: /Zip Code/i });
    const inputPassword = screen.getByLabelText<HTMLInputElement>(/Password/i);

    [
      inputFirstName,
      inputLastName,
      inputUsername,
      inputEmail,
      inputPhone,
      inputSSN,
      inputStreet,
      inputCity,
      inputState,
      inputZipCode,
      inputPassword,
    ].forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });

  it('should show an alert with confirmation message if data was successfully sent, alert should be closable', async () => {
    render(<EmployeeProfileFormWithContexts />);
    const user = userEvent.setup();

    const inputFirstName = screen.getByRole<HTMLInputElement>('textbox', { name: /First Name/i });
    await user.type(inputFirstName, 'Consumeris');

    const inputLastName = screen.getByRole<HTMLInputElement>('textbox', { name: /Last Name/i });
    await user.type(inputLastName, 'Trolis');

    const inputUsername = screen.getByRole<HTMLInputElement>('textbox', { name: /Username/i });
    await user.type(inputUsername, 'consumeris');

    const inputEmail = screen.getByRole<HTMLInputElement>('textbox', { name: /Email/i });
    await user.type(inputEmail, 'consumeris@example.com');

    const inputPhone = screen.getByRole<HTMLInputElement>('textbox', { name: /Phone/i });
    await user.type(inputPhone, '+370 12345678');

    const inputSSN = screen.getByRole<HTMLInputElement>('textbox', { name: /SSN/i });
    await user.type(inputSSN, '123456789');

    const inputStreet = screen.getByRole<HTMLInputElement>('textbox', { name: /Street/i });
    await user.type(inputStreet, 'Debesu');

    const inputCity = screen.getByRole<HTMLInputElement>('textbox', { name: /City/i });
    await user.type(inputCity, 'Kaunas');

    const inputState = screen.getByRole<HTMLInputElement>('textbox', { name: /State/i });
    await user.type(inputState, 'Kaunas');

    const inputZipCode = screen.getByRole<HTMLInputElement>('textbox', { name: /Zip Code/i });
    await user.type(inputZipCode, '55555');

    const inputPassword = screen.getByLabelText<HTMLInputElement>(/Password/i);
    await user.type(inputPassword, 'Test#1234');

    const buttonSubmit = screen.getByRole<HTMLElement>('button', { name: /Submit/i });
    expect(buttonSubmit).toBeInTheDocument();

    await user.click(buttonSubmit);

    await mockAlert(user, 'Successfully updated.');
  }, 15000);

  it('should show an alert with error message on /GET request if there is server error', async () => {
    server.use(rest.get(`${baseURL}/users/:consumerID`, (req, res, ctx) => res(ctx.status(500))));
    const user = userEvent.setup();

    render(<EmployeeProfileFormWithContexts />);

    await mockAlert(user, 'Request failed with status code 500');
  });

  it("should direct to 'Employee Management' page when clicked on 'Cancel'", async () => {
    const mockRouter = {
      route: '/employer/employees/[consumerId]',
      pathname: '/employer/employees/[consumerId]',
      query: { consumerId: 'f24ad404-f09a-4c4e-a3fe-74a775b2fed7' },
      back: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    await act(async () => {
      await waitFor(() => render(<EmployeeProfileFormWithContexts />));
    });

    const buttonCancel = await screen.findByRole('button', { name: 'Cancel' });

    const user = userEvent.setup();
    await user.click(buttonCancel);

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
    expect(mockRouter.back).toHaveBeenCalledWith();
  });
});
