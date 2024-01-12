import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
// Components
import SetupPage from './SetupPage';
// APIs
import { updateEmployerSetup } from '@/pages/api/employerApi';
import { mockAlert } from '@/utils/testUtils';
// Utils
import { render as renderWithSnackbar } from '@/test-utils/testing-library-utils';
// Mocks
import MockAuthProvider from '@/mocks/MockAuthProvider';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

const employerAPI = { updateEmployerSetup };
const requestFunction = jest.spyOn(employerAPI, 'updateEmployerSetup');

describe('Setup Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Components renders with default settings', () => {
    render(<SetupPage />);

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(4);

    const administrationRadioBtn = screen.getByRole('radio', { name: /Administrator default/i });
    expect(administrationRadioBtn).toBeChecked();

    const AllowRadioBtn = screen.getByRole('radio', { name: /Allow/i });
    expect(AllowRadioBtn).toBeDisabled();
    expect(AllowRadioBtn).toBeChecked();
  });

  test('Settings should be not disabled if user click on "Customize" ', async () => {
    render(<SetupPage />);
    const user = userEvent.setup();

    const administrationRadioBtn = screen.getByRole('radio', { name: /Administrator default/i });
    const customizeRadioBtn = screen.getByRole('radio', { name: /Customize/i });
    await user.click(customizeRadioBtn);

    const AllowRadioBtn = screen.getByRole('radio', { name: /Allow/i });
    expect(AllowRadioBtn).not.toBeDisabled();
    expect(AllowRadioBtn).toBeChecked();
    const PreventRadioBtn = screen.getByRole('radio', { name: /Prevent/i });
    expect(PreventRadioBtn).not.toBeDisabled();
    expect(PreventRadioBtn).not.toBeChecked();

    await user.click(PreventRadioBtn);
    expect(PreventRadioBtn).toBeChecked();

    await user.click(AllowRadioBtn);
    expect(AllowRadioBtn).toBeChecked();

    await user.click(administrationRadioBtn);
    expect(AllowRadioBtn).toBeDisabled();
    expect(PreventRadioBtn).toBeDisabled();
  }, 10000);

  test('Submit button with "Administrator default" setting should redirects to another page without request', async () => {
    render(<SetupPage />);
    const user = userEvent.setup();

    const submitBtn = screen.getByRole('button', { name: /Submit/i });
    await user.click(submitBtn);

    expect(requestFunction).toBeCalledTimes(0);
  });

  test('Submit button with "Customize" setting should send request', async () => {
    renderWithSnackbar(
      <MockAuthProvider>
        <SetupPage />
      </MockAuthProvider>,
    );
    const user = userEvent.setup();

    const customizeRadioBtn = screen.getByRole('radio', { name: /Customize/i });
    await user.click(customizeRadioBtn);

    const submitBtn = screen.getByRole('button', { name: /Submit/i });
    await user.click(submitBtn);

    await waitFor(async () => {
      expect(submitBtn).toBeDisabled();
    });
    await mockAlert(user, 'Setup updated');
  });
});
