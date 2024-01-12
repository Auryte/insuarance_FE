import React from 'react';
import { render, screen } from '@/test-utils/testing-library-utils';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

// Mocks
import { server } from '@/mocks/server';
import { mockEmployerUser } from '@/mocks/mockUsers';
import { mockAlert } from '@/utils/testUtils';

// Components
import ManageUserForm from '../ManageUserForm';

describe('Manage users with role employer form', () => {
  it('should render the basic fields', async () => {
    const handleClick = jest.fn();
    const handleReload = jest.fn();
    render(
      <ManageUserForm
        selectedUser={mockEmployerUser}
        handleClick={handleClick}
        handleReload={handleReload}
      />,
    );
    const inputFirstName = await screen.findByLabelText<HTMLSelectElement>(/First Name/i);
    const inputLastName = await screen.findByLabelText<HTMLInputElement>(/Last Name/i);
    const inputEmail = await screen.findByLabelText<HTMLInputElement>(/Email/i);
    const inputUsername = await screen.findByLabelText<HTMLInputElement>(/Username/i);
    const inputPassword = await screen.findByLabelText<HTMLInputElement>(/Password/i);
    const generateButton = await screen.findByRole<HTMLButtonElement>('button', {
      name: 'Generate password',
    });
    const cancelButton = await screen.findByRole<HTMLButtonElement>('button', { name: 'Cancel' });
    const submitButton = await screen.findByRole<HTMLButtonElement>('button', { name: 'Submit' });
    const elements = [
      inputFirstName,
      inputLastName,
      inputEmail,
      inputUsername,
      inputPassword,
      generateButton,
      cancelButton,
      submitButton,
    ];
    elements.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });

  it('should show validation errors when inputs are incorrect ', async () => {
    const handleClick = jest.fn();
    const handleReload = jest.fn();
    render(
      <ManageUserForm
        selectedUser={mockEmployerUser}
        handleClick={handleClick}
        handleReload={handleReload}
      />,
    );
    const user = userEvent.setup();

    const inputFirstName = await screen.findByLabelText<HTMLSelectElement>(/First Name/i);
    expect(inputFirstName).toBeInTheDocument();
    await user.clear(inputFirstName);
    await userEvent.type(inputFirstName, 'Abbc');
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('Abbc');

    const inputLastName = await screen.findByLabelText<HTMLInputElement>(/Last Name/i);
    expect(inputFirstName).toBeInTheDocument();
    await user.clear(inputLastName);
    await userEvent.type(inputLastName, 'Vartotojas');
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Vartotojas');

    const inputEmail = await screen.findByLabelText<HTMLInputElement>(/Email/i);
    expect(inputFirstName).toBeInTheDocument();
    await user.clear(inputEmail);
    await userEvent.type(inputEmail, 'Vartotojas');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('Vartotojas');

    const inputUsername = await screen.findByLabelText<HTMLInputElement>(/Username/i);
    expect(inputFirstName).toBeInTheDocument();
    await user.clear(inputUsername);
    await userEvent.type(inputUsername, 'Vartotojas');
    expect(screen.getByLabelText(/Username/i)).toHaveValue('Vartotojas');

    const inputPassword = await screen.findByLabelText<HTMLInputElement>(/Password/i);
    expect(inputFirstName).toBeInTheDocument();
    await user.clear(inputPassword);
    await userEvent.type(inputPassword, 'Vartotojas');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('Vartotojas');

    const buttonSubmit = screen.getByRole('button', { name: /Submit/i });
    expect(buttonSubmit).toBeInTheDocument();

    await user.click(buttonSubmit);

    const errorEmail = await screen.findByText(/Email must be a valid email./i);
    expect(errorEmail).toBeInTheDocument();
    const errorPassword = await screen.findByText(
      /Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character./i,
    );
    expect(errorPassword).toBeInTheDocument();
  });

  it('should show an alert with confirmation message if data was successfully sent', async () => {
    const handleClick = jest.fn();
    const handleReload = jest.fn();
    render(
      <ManageUserForm
        selectedUser={mockEmployerUser}
        handleClick={handleClick}
        handleReload={handleReload}
      />,
    );
    const user = userEvent.setup();

    const inputFirstName = await screen.findByLabelText<HTMLSelectElement>(/First Name/i);
    await user.clear(inputFirstName);
    await user.type(inputFirstName, 'Useris');
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('Useris');

    const inputLastName = await screen.findByLabelText<HTMLInputElement>(/Last Name/i);
    await user.clear(inputLastName);
    await user.type(inputLastName, 'Userauskas');

    const inputEmail = await screen.findByLabelText<HTMLInputElement>(/Email/i);
    await user.clear(inputEmail);
    await user.type(inputEmail, 'Userauskas@gmail.com');

    const inputUsername = await screen.findByLabelText<HTMLInputElement>(/Username/i);
    await user.clear(inputUsername);
    await user.type(inputUsername, 'Userauskasss');

    const inputPassword = await screen.findByLabelText<HTMLInputElement>(/Password/i);
    await user.clear(inputPassword);
    await user.type(inputPassword, 'User@1234');

    const buttonSubmit = screen.getByRole<HTMLElement>('button', { name: /Submit/i });
    expect(buttonSubmit).toBeInTheDocument();

    await user.click(buttonSubmit);

    await mockAlert(user, 'User updated successfully.');
  });

  it('should show an alert with error message if there is server error', async () => {
    const handleClick = jest.fn();
    const handleReload = jest.fn();
    render(
      <ManageUserForm
        selectedUser={mockEmployerUser}
        handleClick={handleClick}
        handleReload={handleReload}
      />,
    );
    server.resetHandlers(
      rest.post('http://localhost:8000/users/:employerId/users', (req, res, ctx) =>
        res(ctx.status(500)),
      ),
    );
    const user = userEvent.setup();
    const inputFirstName = await screen.findByLabelText<HTMLSelectElement>(/First Name/i);
    await user.clear(inputFirstName);
    await user.type(inputFirstName, 'Useris');
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('Useris');

    const inputLastName = await screen.findByLabelText<HTMLInputElement>(/Last Name/i);
    await user.clear(inputLastName);
    await user.type(inputLastName, 'Userauskas');

    const inputEmail = await screen.findByLabelText<HTMLInputElement>(/Email/i);
    await user.clear(inputEmail);
    await user.type(inputEmail, 'Userauskas@gmail.com');

    const inputUsername = await screen.findByLabelText<HTMLInputElement>(/Username/i);
    await user.clear(inputUsername);
    await user.type(inputUsername, 'Userauskasss');

    const inputPassword = await screen.findByLabelText<HTMLInputElement>(/Password/i);
    await user.clear(inputPassword);
    await user.type(inputPassword, 'User@1234');

    const buttonSubmit = screen.getByRole<HTMLElement>('button', { name: /Submit/i });
    expect(buttonSubmit).toBeInTheDocument();

    await user.click(buttonSubmit);

    await mockAlert(user, 'Network Error');
  });

  it('should create password when button "generate password" clicked', async () => {
    const handleClick = jest.fn();
    const handleReload = jest.fn();
    render(
      <ManageUserForm
        selectedUser={mockEmployerUser}
        handleClick={handleClick}
        handleReload={handleReload}
      />,
    );
    const user = userEvent.setup();

    const inputFirstName = await screen.findByLabelText<HTMLSelectElement>(/First Name/i);
    await user.clear(inputFirstName);
    await user.type(inputFirstName, 'Userauskas');

    const inputPassword = await screen.findByLabelText<HTMLInputElement>(/Password/i);
    await user.clear(inputPassword);

    const generateButton = await screen.findByRole<HTMLButtonElement>('button', {
      name: 'Generate password',
    });
    expect(generateButton).toBeInTheDocument();

    await user.click(generateButton);

    const passwordInput = ((await screen.findByLabelText(/Password/i)) as HTMLInputElement).value;
    console.log('passwordInput', passwordInput);
    expect(passwordInput).toMatch(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
    );
  });
});
