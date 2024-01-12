import React from 'react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

// Contexts
import EmployerContext from '@/contexts/EmployerContext';
import { PlanYearContext } from '@/contexts/PlanYearContext';

// Components
import ManagePlans from '../ManagePlans';

// Mocks
import { mockEmployer } from '@/mocks/mockEmployer';
import { server } from '@/mocks/server';

// Utils
import { render, screen } from '@/test-utils/testing-library-utils';
import { mockAlert } from '@/utils/testUtils';

describe('Manage plans', () => {
  const setEmployer = jest.fn();
  const setPlanYear = jest.fn();

  const ManagePlansWithContexts = () => (
    <EmployerContext.Provider value={{ employer: mockEmployer, saveEmployer: setEmployer }}>
      <PlanYearContext.Provider value={{ planYear: null, setPlanYear }}>
        <ManagePlans />
      </PlanYearContext.Provider>
    </EmployerContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Table renders', async () => {
    render(<ManagePlansWithContexts />);

    const tableRows = await screen.findAllByText('TrainingFE');
    expect(tableRows).toHaveLength(2);
  });

  test('Error alert renders', async () => {
    server.use(
      rest.get(
        'http://localhost:8000/employers/6161a553-20f6-46ba-b7ca-7f6c55645708/plans',
        (req, res, ctx) => res(ctx.status(500)),
      ),
    );
    const user = userEvent.setup();

    render(<ManagePlansWithContexts />);

    await mockAlert(user, 'Request failed with status code 500');
  });

  test('Redirects to form for create new plan', async () => {
    const user = userEvent.setup();

    render(<ManagePlansWithContexts />);

    const addButton = await screen.findByRole<HTMLElement>('button', {
      name: /Add New Plan Year/i,
    });

    await user.click(addButton);

    expect(setPlanYear).toHaveBeenCalledTimes(1);
  });

  test('Redirects to form for update a plan', async () => {
    const user = userEvent.setup();

    render(<ManagePlansWithContexts />);

    const updateButtons = await screen.findAllByRole<HTMLElement>('button', {
      name: /Update/i,
    });
    const updateBtn = updateButtons[0];
    await user.click(updateBtn);

    expect(setPlanYear).toHaveBeenCalledTimes(1);
  });

  test('Deleted plan removes from screen', async () => {
    const user = userEvent.setup();

    render(<ManagePlansWithContexts />);

    const removeButton = await screen.findByRole<HTMLElement>('button', {
      name: /Remove/i,
    });
    await user.click(removeButton);

    await mockAlert(user, 'Plan deleted successfully.');
    const tableRows = await screen.findAllByText('TrainingFE');
    expect(tableRows).toHaveLength(1);
  });

  test('Error in delete plan request shows snackbar', async () => {
    server.use(
      rest.delete(
        'http://localhost:8000/employers/6161a553-20f6-46ba-b7ca-7f6c55645708/plans/bbe1ca2b-95e4-4a6c-90b8-ac9b8fd795e7',
        (req, res, ctx) => res(ctx.status(400)),
      ),
    );
    const user = userEvent.setup();

    render(<ManagePlansWithContexts />);

    const removeButton = await screen.findByRole<HTMLElement>('button', {
      name: /Remove/i,
    });
    await user.click(removeButton);

    await mockAlert(user, 'Request failed with status code 400');
  });

  test('Initialized plan removes buttons and update info in a screen', async () => {
    const user = userEvent.setup();

    render(<ManagePlansWithContexts />);

    const initializeButton = await screen.findByRole<HTMLElement>('button', {
      name: /Initialize/i,
    });
    await user.click(initializeButton);

    await mockAlert(user, 'Plan initialized successfully.');
    const tableRows = await screen.findAllByText('Initialized on 2023-12-13');
    expect(tableRows).toHaveLength(2);
  });

  test('Initialized plan removes buttons and update info in a screen', async () => {
    server.use(
      rest.patch(
        'http://localhost:8000/employers/6161a553-20f6-46ba-b7ca-7f6c55645708/plans/bbe1ca2b-95e4-4a6c-90b8-ac9b8fd795e7/initialize',
        (req, res, ctx) => res(ctx.status(400)),
      ),
    );
    const user = userEvent.setup();

    render(<ManagePlansWithContexts />);

    const initializeButton = await screen.findByRole<HTMLElement>('button', {
      name: /Initialize/i,
    });
    await user.click(initializeButton);

    await mockAlert(user, 'Request failed with status code 400');
  });
});
