import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { mockUsersForEmployeeTable } from '@/mocks/mockUser';

// Components
import SearchEmployerPage from '../EmployeeSearchPage';
import { AuthContext } from '@/contexts/AuthContext';
// Mocks
import { mockDecodedToken } from '@/mocks/mockUser';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock('@/services/localStorage', () => ({
  getFromLocalStorage: jest.fn().mockResolvedValue(true),
}));

const SearchEmployee = () => (
  <AuthContext.Provider
    value={{
      getUser: () => undefined,
      user: mockDecodedToken,
      login: async (): Promise<void> => {},
      isUserAuthenticated: () => false,
      logout: () => {},
    }}
  >
    <SearchEmployerPage />
  </AuthContext.Provider>
);

describe('Search employer page', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  test('Components renders', () => {
    render(<SearchEmployee />);
    expect(screen.getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /last name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /ssn/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /First Name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Last Name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /SSN/i })).toBeInTheDocument();
  });

  test('Skeleton renders', async () => {
    render(<SearchEmployee />);
    const skeletonRows = document.querySelectorAll('.MuiSkeleton-text');
    expect(skeletonRows).toHaveLength(8);
  });

  test('Table with employees renders', async () => {
    await act(async () => {
      await waitFor(() => render(<SearchEmployee />));
    });

    const pagination = await screen.findByTestId('table-pagination');
    expect(pagination).toBeInTheDocument();

    await waitFor(async () => {
      const rows = await screen.findAllByText('employer');
      expect(rows).toHaveLength(10);
    });
  });

  test('Pages change on click next page button', async () => {
    await act(async () => {
      await waitFor(() => render(<SearchEmployee />));
    });
    const user = userEvent.setup();

    const rows = await screen.findAllByText('employer');
    expect(rows).toHaveLength(10);

    const nextPageButton = await screen.findByRole('button', {
      name: 'Go to next page',
    });

    await user.click(nextPageButton);

    await waitFor(() => {
      const skeletonRows = document.querySelectorAll('.MuiSkeleton-text');
      expect(skeletonRows).toHaveLength(8);
    });

    expect(await screen.findAllByText('employer')).toHaveLength(5);
  });

  test('Result change on click "search" button with some data in fields', async () => {
    await act(async () => {
      await waitFor(() => render(<SearchEmployee />));
    });
    const user = userEvent.setup();

    const searchField = screen.getByRole('textbox', { name: /first name/i });

    const rows = await screen.findAllByText('employer');
    expect(rows).toHaveLength(10);

    const searchButton = await screen.findByRole('button', {
      name: 'Search',
    });

    await user.type(searchField, 'sdsdgdsgdsgdsfgsdg');
    await user.click(searchButton);

    await waitFor(() => {
      const skeletonRows = document.querySelectorAll('.MuiSkeleton-text');
      expect(skeletonRows).toHaveLength(8);
    });

    expect(screen.queryAllByText('employer')).toHaveLength(0);
  });

  test('Click on "Add New Employee" redirects to a page for adding new employee', async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    await act(async () => {
      await waitFor(() => render(<SearchEmployee />));
    });
    expect(screen.getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
    const user = userEvent.setup();
    const addNewButton = screen.getByRole('button', { name: /add new/i });
    await user.click(addNewButton);
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith(undefined + '/add-employee');
  });

  test('Click on table row redirects to a specific user management page', async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    await act(async () => {
      await waitFor(() => render(<SearchEmployee />));
    });

    const rows = await screen.findAllByText('employer');

    const user = userEvent.setup();
    await user.click(rows[0]);

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith(undefined + '/' + mockUsersForEmployeeTable[0].id);
  });
});
