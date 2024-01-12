import React from 'react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

// Contexts
import EmployerContext from '@/contexts/EmployerContext';

// Components
import ManageUsers from '../ManageUsers';

// Mocks
import { mockEmployer } from '@/mocks/mockEmployer';
import { server } from '@/mocks/server';

// Utils
import { render, screen } from '@/test-utils/testing-library-utils';
import { mockAlert } from '@/utils/testUtils';

// Constants
import { baseURL } from '@/constants/constants';

describe('ManageUsers', () => {
  const setEmployer = jest.fn();

  const ManageUsersWithContexts = () => (
    <EmployerContext.Provider value={{ employer: mockEmployer, saveEmployer: setEmployer }}>
      <ManageUsers />
    </EmployerContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render table successfully', async () => {
    render(<ManageUsersWithContexts />);

    const nameTableHeader = screen.getByRole('columnheader', { name: /Name/ });
    const usernameTableHeader = screen.getByRole('columnheader', { name: /Username/ });
    const emailTableHeader = screen.getByRole('columnheader', { name: /Email/ });
    [nameTableHeader, usernameTableHeader, emailTableHeader].forEach(item =>
      expect(item).toBeInTheDocument(),
    );

    const tableRows = await screen.findAllByText(/Admina Adminaite/i);
    expect(tableRows).toHaveLength(8);
  });

  it('should render table row skeleton successfully', () => {
    render(<ManageUsersWithContexts />);
    const skeletonRows = document.querySelectorAll('.MuiSkeleton-text');
    expect(skeletonRows).toHaveLength(8);
  });

  it('should render server error', async () => {
    server.use(
      rest.get(`${baseURL}/employers/6161a553-20f6-46ba-b7ca-7f6c55645708/users`, (req, res, ctx) =>
        res(ctx.status(500)),
      ),
    );
    const user = userEvent.setup();

    render(<ManageUsersWithContexts />);

    await mockAlert(user, 'Request failed with status code 500');
  });
});
