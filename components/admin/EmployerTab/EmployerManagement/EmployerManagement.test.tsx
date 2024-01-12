import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/test-utils/testing-library-utils';
import EmployerManagement from './EmployerManagement';
import EmployerContext from '@/contexts/EmployerContext';
import { Employer } from '@/types/employer';
import ViewsContext from '@/contexts/AdminViewsContext';

describe('EmployerManagement tests appearance', () => {
  test('It should render the basic fields', async () => {
    render(<EmployerManagement />);
    const heading = screen.getByRole<HTMLElement>('heading', {
      name: /Employer Administration for/i,
    });
    const headingEmployerSetup = screen.getByRole<HTMLElement>('heading', {
      name: /Employer Setup/i,
    });
    const headingPlanSetup = screen.getByRole<HTMLElement>('heading', {
      name: /Plan Setup/i,
    });
    const buttonSelect = screen.getByRole<HTMLElement>('button', {
      name: /Select Different Employer/i,
    });
    const buttonManageProfile = screen.getByRole<HTMLElement>('button', {
      name: /Manage Profile/i,
    });
    const buttonManageUsers = screen.getByRole<HTMLElement>('button', {
      name: /Manage Users/i,
    });
    const buttonManageRules = screen.getByRole<HTMLElement>('button', {
      name: /Manage Rules/i,
    });
    const buttonManagePlans = screen.getByRole<HTMLElement>('button', {
      name: /Manage Plans/i,
    });
    const elements = [
      heading,
      headingEmployerSetup,
      headingPlanSetup,
      buttonSelect,
      buttonManageProfile,
      buttonManageUsers,
      buttonManageRules,
      buttonManagePlans,
    ];
    elements.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });
});

function renderEmployerView(viewName: string | number) {
  const setViewName = jest.fn;
  return render(
    <ViewsContext.Provider value={{ viewName, setViewName }}>
      <EmployerManagement />
    </ViewsContext.Provider>,
  );
}

describe('EmployerManagement views change', () => {
  test('It should change view on Manage Profile button click', async () => {
    render(<EmployerManagement />);
    const user = userEvent.setup();
    const buttonProfile = screen.getByRole<HTMLElement>('button', {
      name: /Manage Profile/i,
    });
    await user.click(buttonProfile);
    const viewName = 'manageProfile';
    renderEmployerView(viewName);
    expect(viewName).toBe('manageProfile');
  });

  test('It should change view on "manage Users" button click', async () => {
    render(<EmployerManagement />);
    const user = userEvent.setup();
    const buttonUsers = screen.getByRole<HTMLElement>('button', {
      name: /Manage Users/i,
    });
    await user.click(buttonUsers);
    const viewName = 'manageUsers';
    renderEmployerView(viewName);
    expect(viewName).toBe('manageUsers');
  });
  test('It should change view on "manage Rules" button click', async () => {
    render(<EmployerManagement />);
    const user = userEvent.setup();
    const buttonRules = screen.getByRole<HTMLElement>('button', {
      name: /Manage Rules/i,
    });
    await user.click(buttonRules);
    const viewName = 'manageRules';
    renderEmployerView(viewName);
    expect(viewName).toBe('manageRules');
  });
  test('It should change view on "manage Plans" button click', async () => {
    render(<EmployerManagement />);
    const user = userEvent.setup();
    const button = screen.getByRole<HTMLElement>('button', {
      name: /Manage Plans/i,
    });
    await user.click(button);
    const viewName = 'managePlans';
    renderEmployerView(viewName);
    expect(viewName).toBe('managePlans');
  });
  test('It should change view on "Select Different Employer" button click', async () => {
    render(<EmployerManagement />);
    const user = userEvent.setup();
    const button = screen.getByRole<HTMLElement>('button', {
      name: /Select Different Employer/i,
    });
    await user.click(button);
    const viewName = 'employerSearch';
    renderEmployerView(viewName);
    expect(viewName).toBe('employerSearch');
  });
});

function renderEmployerHeading(employer: Employer) {
  const saveEmployer = jest.fn;
  return render(
    <EmployerContext.Provider value={{ employer, saveEmployer }}>
      <EmployerManagement />
    </EmployerContext.Provider>,
  );
}
describe('EmployerManagement It should render Heading with current employer name', () => {
  test('Employer heading shows the current employer name', async () => {
    const employer = {
      name: 'LT - Coherent',
      code: 'LT',
      street: 'gatve',
      city: 'Vilnius',
      state: '',
      zip: '',
      phone: '+370699333222',
      id: '554484884848',
    };
    renderEmployerHeading(employer);
    expect(screen.getByText('Employer Administration for "LT - Coherent"')).toBeInTheDocument();
  });
});
