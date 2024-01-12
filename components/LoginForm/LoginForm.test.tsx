import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import LoginForm from './LoginForm';

describe('LoginForm - Check if inputs and login submit button are on screen', () => {
  test("'Input Username' buton should be visible on the screen.", () => {
    render(<LoginForm />);
    const inputUsername = screen.getByLabelText<HTMLElement>(/username/i);
    expect(inputUsername).toBeInTheDocument();
  });

  test("'Input Password' buton should be visible on the screen.", () => {
    render(<LoginForm />);
    const inputPassword = screen.getByLabelText<HTMLElement>(/password/i);
    expect(inputPassword).toBeInTheDocument();
  });

  test("'Login' buton should be visible on the screen.", () => {
    render(<LoginForm />);
    const buttonLogin = screen.getByRole<HTMLElement>('button', { name: /Login/i });
    expect(buttonLogin).toBeInTheDocument();
  });

  describe('LoginForm - Check validation on submit if there are empty fields', () => {
    test('On submit if the password field is empty show error message', async () => {
      render(<LoginForm />);
      const user = userEvent.setup();

      const inputUsername = screen.getByLabelText(/username/i);
      expect(inputUsername).toBeInTheDocument();

      await user.clear(inputUsername);
      await userEvent.type(inputUsername, 'Maria');
      expect(screen.getByLabelText(/username/i)).toHaveValue('Maria');

      const inputPassword = screen.getByLabelText(/password/i);
      expect(inputPassword).toBeInTheDocument();

      const buttonLogin = screen.getByRole('button', { name: /Login/i });
      expect(buttonLogin).toBeInTheDocument();

      await user.click(buttonLogin);
      const errorPassword = await screen.findByText(/Password is required./i);
      expect(errorPassword).toBeInTheDocument();
    });

    test('On submit if username field is empty show error message ', async () => {
      render(<LoginForm />);
      const user = userEvent.setup();
      const inputPassword = screen.getByLabelText(/password/i);

      expect(inputPassword).toBeInTheDocument();
      await user.clear(inputPassword);
      await userEvent.type(inputPassword, '123456');
      expect(screen.getByLabelText(/password/i)).toHaveValue('123456');

      const inputUsername = screen.getByLabelText(/username/i);
      expect(inputUsername).toBeInTheDocument();
      const buttonLogin = screen.getByRole('button', { name: /Login/i });
      expect(buttonLogin).toBeInTheDocument();
      await user.click(buttonLogin);

      const errorUsername = await screen.findByText(/Username is required./i);
      expect(errorUsername).toBeInTheDocument();
    });

    test('On submit if username and password fields are empty show error message ', async () => {
      render(<LoginForm />);
      const user = userEvent.setup();
      const inputPassword = screen.getByLabelText(/password/i);
      expect(inputPassword).toBeInTheDocument();

      const inputUsername = screen.getByLabelText(/username/i);
      expect(inputUsername).toBeInTheDocument();

      const buttonLogin = screen.getByRole('button', { name: /Login/i });
      expect(buttonLogin).toBeInTheDocument();
      await user.click(buttonLogin);

      const errorUsername = await screen.findByText(/Username is required./i);
      expect(errorUsername).toBeInTheDocument();
      const errorPassword = await screen.findByText(/Password is required./i);
      expect(errorPassword).toBeInTheDocument();
    });
  });
});
