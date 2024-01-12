import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Employer } from '@/types/employer';

import EmployerListTable from './EmployerListTable';

describe('Test could of rendered Employer rows', () => {
  test('It should render 2 employer rows if recieved employers array has length of 2', () => {
    const mockedEmployers: Employer[] = [
      {
        city: 'Kaunas',
        code: 'LT',
        id: 'f634658f-5639-4143-b9e4-2537cf30a76e',
        name: 'AA - CoherentSolutions',
        phone: '+370 699 13223322',
        state: 'Kaunas',
        street: 'Debesu',
        zipCode: '55555',
      },
      {
        city: 'Sofia',
        code: 'BG',
        id: 'f634658f-5639-4143-b9e4-253dfghhhhe',
        name: 'BG - CoherentSolutions',
        phone: '+359 13223322',
        state: 'Kniii',
        street: 'Street',
        zipCode: '101010',
      },
    ];

    render(
      <EmployerListTable
        loading={false}
        employers={mockedEmployers}
        employerClickHandler={() => {}}
      />,
    );
    const employerRows = screen.getAllByTestId('employer-row');
    expect(employerRows).toHaveLength(2);
  });

  test('It should render 0 employer rows if recieved emloyers array has length of 0', () => {
    const mockedEmployers: Employer[] = [];
    render(
      <EmployerListTable
        loading={false}
        employers={mockedEmployers}
        employerClickHandler={() => {}}
      />,
    );
    const tableBodyElement = screen.getByTestId('employer-table-body');
    expect(tableBodyElement).not.toContainElement(null);
  });
});
