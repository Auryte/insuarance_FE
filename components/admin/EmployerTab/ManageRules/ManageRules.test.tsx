import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Contexts
import ViewsContext from '@/contexts/AdminViewsContext';
import EmployerContext from '@/contexts/EmployerContext';
// Components
import ManageRules from './ManageRules';
import MockAuthProvider from '@/mocks/MockAuthProvider';
// Types
import { MainViews } from '@/types/adminTypes';
// Mocks
import { mockEmployer } from '@/mocks/mockEmployer';
// Utils
import { mockAlert } from '@/utils/testUtils';
import { render as renderWithSnackbar } from '@/test-utils/testing-library-utils';

const mockSetViewName = jest.fn();

const ManageRulesWithContexts = () => (
  <MockAuthProvider>
    <EmployerContext.Provider
      value={{
        employer: { ...mockEmployer, id: 'ac2489c9-9e98-48a6-bafc-4f9e159bfeae' },
        saveEmployer: () => undefined,
      }}
    >
      <ViewsContext.Provider
        value={{
          viewName: MainViews.manageRules,
          setViewName: mockSetViewName,
        }}
      >
        <ManageRules />
      </ViewsContext.Provider>
    </EmployerContext.Provider>
  </MockAuthProvider>
);

describe('Manage Rules', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('component renders', () => {
    render(<ManageRulesWithContexts />);

    const [allowAddConsumers, allowClaimFilling] = screen.getAllByRole('radio', { name: /Allow/i });
    expect(
      screen.getByText(`Employer Administration for "${mockEmployer.name}"`),
    ).toBeInTheDocument();
    expect(allowAddConsumers).toBeChecked();
    expect(allowClaimFilling).toBeChecked();
    expect(screen.getByRole('button', { name: /Submit/i })).not.toBeDisabled();
  });

  test('radio buttons click correctly', async () => {
    render(<ManageRulesWithContexts />);

    const user = userEvent.setup();

    const [allowAddConsumers, allowClaimFilling] = screen.getAllByRole('radio', { name: /Allow/i });
    const [preventAddConsumers, preventClaimFilling] = screen.getAllByRole('radio', {
      name: /Prevent/i,
    });

    await user.click(preventAddConsumers);
    await user.click(preventClaimFilling);
    expect(preventAddConsumers).toBeChecked();
    expect(preventClaimFilling).toBeChecked();

    await user.click(allowAddConsumers);
    await user.click(allowClaimFilling);
    expect(allowAddConsumers).toBeChecked();
    expect(allowClaimFilling).toBeChecked();
  });

  test('Cancel button redirects to another view', async () => {
    render(<ManageRulesWithContexts />);

    const user = userEvent.setup();
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    await user.click(cancelButton);
    expect(mockSetViewName).toBeCalledTimes(1);
  });

  test('Submit button shows alert', async () => {
    renderWithSnackbar(<ManageRulesWithContexts />);

    const user = userEvent.setup();

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
    expect(submitButton).toBeDisabled();
    await mockAlert(user, 'Rules updated.');
  });
});
