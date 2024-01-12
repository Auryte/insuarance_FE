import React from 'react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

// Utils
import { render, screen, waitFor, within } from '@/test-utils/testing-library-utils';
import { PayrollFrequency, PlanType } from '@/types/insurance';

// Component
import ManagePlanYear from './ManagePlanYear';

// Context
import { PlanYearContext } from '@/contexts/PlanYearContext';
import EmployerContext from '@/contexts/EmployerContext';

// Mock
import { server } from '@/mocks/server';
import { mockPlanYear } from '@/mocks/mockPlanYear';
import { mockAlert } from '@/utils/testUtils';

describe('ManagePlanYear', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('component renders', () => {
    render(<ManagePlanYear />);
    const heading = screen.getByRole<HTMLElement>('heading', { name: /Employer Administration/i });
    const inputName = screen.getByRole<HTMLInputElement>('textbox', { name: /name/i });
    const inputContributions = screen.getByRole<HTMLInputElement>('spinbutton', {
      name: /Contributions/i,
    });
    const inputStartDate = screen.getByRole<HTMLInputElement>('textbox', { name: /Start date/i });
    const inputEndDate = screen.getByRole<HTMLInputElement>('textbox', { name: /End date/i });
    const inputPayrollFrequency = screen.getByRole<HTMLInputElement>('button', {
      name: /Payroll frequency/i,
    });
    const inputType = screen.getByRole<HTMLInputElement>('button', { name: /Plan type/i });
    const buttonSubmit = screen.getByRole<HTMLElement>('button', { name: /Submit/i });
    const buttonCancel = screen.getByRole<HTMLElement>('button', { name: /Cancel/i });
    const elements = [
      heading,
      inputName,
      inputContributions,
      inputStartDate,
      inputEndDate,
      inputPayrollFrequency,
      inputType,
      buttonSubmit,
      buttonCancel,
    ];
    elements.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });

  it('It should show errors when inputs are incorrect', async () => {
    render(<ManagePlanYear />);
    const user = userEvent.setup();

    const inputName = screen.getByLabelText(/name/i);
    await userEvent.type(inputName, 'NO');
    expect(screen.getByLabelText(/name/i)).toHaveValue('NO');

    const inputContributions = screen.getByLabelText(/contributions/i);
    await userEvent.type(inputContributions, '12345');
    expect(inputContributions).toHaveValue(12345);

    const inputStartDate = screen.getByLabelText(/Start date/i);
    expect(inputStartDate).toBeInTheDocument();
    await user.clear(inputStartDate);
    expect(inputStartDate).toHaveValue('');

    const inputEndDate = screen.getByLabelText(/End date/i);
    expect(inputEndDate).toBeInTheDocument();

    const inputPlanType = screen.getByLabelText(/Plan type/i);
    expect(inputPlanType).toBeInTheDocument();

    const inputPayrollFrequency = screen.getByLabelText(/Payroll frequency/i);
    expect(inputPayrollFrequency).toBeInTheDocument();

    const buttonSubmit = screen.getByRole('button', { name: /Submit/i });
    expect(buttonSubmit).toBeInTheDocument();
    await user.click(buttonSubmit);

    const errorName = await screen.findByText(/Name must be at least 3 characters./i);
    expect(errorName).toBeInTheDocument();
    const errorContributions = await screen.findByText(
      /Contributions must be at most 4 characters./i,
    );
    expect(errorContributions).toBeInTheDocument();
    const errorStartDate = await screen.findByText(/Start date is required./i);
    expect(errorStartDate).toBeInTheDocument();
    const errorEndDate = await screen.findByText(/End date is required./i);
    expect(errorEndDate).toBeInTheDocument();
    const errorPlanType = await screen.findByText(/Plan type is required./i);
    expect(errorPlanType).toBeInTheDocument();
    const errorPayrollFrequency = await screen.findByText(/Payroll frequency is required./i);
    expect(errorPayrollFrequency).toBeInTheDocument();
  });

  it('It should be filled with preloaded data', async () => {
    render(
      <PlanYearContext.Provider
        value={{
          planYear: mockPlanYear,
          setPlanYear: () => {},
        }}
      >
        <ManagePlanYear />
      </PlanYearContext.Provider>,
    );
    expect(screen.getByLabelText(/name/i)).toHaveValue('TrainingFE');

    const inputContributions = screen.getByLabelText(/contributions/i);
    expect(inputContributions).toHaveValue(234);

    const inputStartDate = screen.getByLabelText(/Start date/i);
    expect(inputStartDate).toHaveValue('12/13/2022');

    const inputEndDate = screen.getByLabelText(/End date/i);

    expect(inputEndDate).toHaveValue('12/14/2022');

    const inputPlanType = screen.getByLabelText(/Plan type/i);
    const inputType = await within(inputPlanType).findByText(RegExp(PlanType.dental, 'i'));
    expect(inputType).toHaveTextContent(RegExp(PlanType.dental, 'i'));

    const inputPayrollFrequency = screen.getByLabelText(/Payroll frequency/i);
    const inputPayroll = await within(inputPayrollFrequency).findByText(
      RegExp(PayrollFrequency.monthly, 'i'),
    );
    expect(inputPayroll).toHaveTextContent(RegExp(PayrollFrequency.monthly, 'i'));
  });

  it('It should show popup alert', async () => {
    render(
      <PlanYearContext.Provider
        value={{
          planYear: mockPlanYear,
          setPlanYear: () => {},
        }}
      >
        <ManagePlanYear />
      </PlanYearContext.Provider>,
    );
    let popup: HTMLElement;
    let popupCancel: HTMLElement;
    const user = userEvent.setup();
    const submitFormButton = screen.getByRole('button', { name: 'Submit' });
    const cancelFormButton = screen.getByRole('button', { name: 'Cancel' });

    await user.click(submitFormButton);

    popup = await screen.findByText('This action will send the data');
    expect(popup).toBeInTheDocument();
    popupCancel = await screen.findByTestId('cancel-popup');
    await user.click(popupCancel);
    await waitFor(() => {
      expect(screen.queryByText('This action will send the data')).not.toBeInTheDocument();
    });

    await user.click(cancelFormButton);
    popup = await screen.findByText('This action will redirects to manage plans page');
    expect(popup).toBeInTheDocument();
    popupCancel = screen.getByTestId('cancel-popup');
    await user.click(popupCancel);
    await waitFor(async () => {
      expect(
        screen.queryByText('This action will redirects to manage plans page'),
      ).not.toBeInTheDocument();
    });
  });

  it('It should show alert after update plan year', async () => {
    server.use(
      rest.patch(
        'http://localhost:8000/employers/6161a553-20f6-46ba-b7ca-7f6c55645708/plans/bbe1ca2b-95e4-4a6c-90b8-ac9b8fd795e7',
        (req, res, ctx) => res(ctx.json(mockPlanYear)),
      ),
    );
    render(
      <EmployerContext.Provider
        value={{
          employer: {
            name: 'By - Issoft',
            code: 'BY',
            street: 'Chapaeva',
            city: 'Minsk',
            phone: '+375001112233',
            id: '6161a553-20f6-46ba-b7ca-7f6c55645708',
            claimFilling: true,
          },
          saveEmployer: () => {},
        }}
      >
        <PlanYearContext.Provider
          value={{
            planYear: mockPlanYear,
            setPlanYear: () => {},
          }}
        >
          <ManagePlanYear />
        </PlanYearContext.Provider>
      </EmployerContext.Provider>,
    );
    const user = userEvent.setup();
    const submitFormButton = screen.getByRole('button', { name: 'Submit' });

    expect(submitFormButton).toBeInTheDocument();
    await user.click(submitFormButton);
    const popup = await screen.findByText('This action will send the data');
    expect(popup).toBeInTheDocument();
    const popupSubmit = await screen.findByTestId('submit-popup');
    expect(popupSubmit).toBeInTheDocument();
    await user.click(popupSubmit);
    await waitFor(async () => {
      expect(await screen.findByText(/This action will send the data/i)).not.toBeVisible();
    });

    await mockAlert(user, 'Successfully updated.');
  });

  it('Calendar should changes automatically', async () => {
    render(<ManagePlanYear />);

    const user = userEvent.setup();
    const inputStartDate = screen.getByLabelText(/Start date/i);

    user.clear(inputStartDate);
    const inputEndDate = screen.getByLabelText(/End date/i);
    user.clear(inputEndDate);
    await user.type(inputStartDate, '12162035');
    await user.type(inputEndDate, '12142035');

    expect(inputStartDate).toHaveValue('12/16/2035');
    expect(inputEndDate).toHaveValue('12/16/2035');
  });
});
