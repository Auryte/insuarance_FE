import React from 'react';
import { render, screen } from '@/test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '@/mocks/server';

import AddUpdateEmployer from '../AddUpdateEmployer';
import { mockAlert } from '@/utils/testUtils';

describe('AddUpdateEployer', () => {
  it('should render the base view', async () => {
    render(<AddUpdateEmployer />);
    const inputCode = screen.getByRole<HTMLInputElement>('textbox', { name: 'Code' });
    const inputName = screen.getByRole<HTMLInputElement>('textbox', { name: /name/i });
    const inputStreet = screen.getByRole<HTMLInputElement>('textbox', { name: /street/i });
    const inputCity = screen.getByRole<HTMLInputElement>('textbox', { name: /city/i });
    const inputState = screen.getByRole<HTMLInputElement>('textbox', { name: /state/i });
    const inputZip = screen.getByRole<HTMLInputElement>('textbox', { name: /zip/i });
    const inputPhone = screen.getByRole<HTMLInputElement>('textbox', { name: /phone/i });
    const buttonSubmit = screen.getByRole<HTMLElement>('button', { name: /Submit/i });
    const buttonCancel = screen.getByRole<HTMLElement>('button', { name: /Cancel/i });

    const elements = [
      inputName,
      inputCode,
      inputStreet,
      inputCity,
      inputState,
      inputZip,
      inputPhone,
      buttonSubmit,
      buttonCancel,
    ];
    elements.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });
});

describe('AddUpdateEployer', () => {
  it("should show validation errors when inputs are incorrect and input don't reset", async () => {
    render(<AddUpdateEmployer />);
    const user = userEvent.setup();

    const inputName = screen.getByLabelText(/Name/i);
    expect(inputName).toBeInTheDocument();
    await user.clear(inputName);
    await userEvent.type(inputName, 'Abb');
    expect(screen.getByLabelText(/Name/i)).toHaveValue('Abb');

    const inputCode = screen.getByLabelText(/Zip Code/i);
    expect(inputCode).toBeInTheDocument();
    await user.clear(inputCode);
    await userEvent.type(inputCode, '222');
    expect(screen.getByLabelText(/Zip Code/i)).toHaveValue('222');

    const inputStreet = screen.getByLabelText(/Street/i);
    expect(inputStreet).toBeInTheDocument();
    await user.clear(inputStreet);
    await userEvent.type(inputStreet, 'debesu');
    expect(screen.getByLabelText(/Street/i)).toHaveValue('debesu');

    const buttonSubmit = screen.getByRole('button', { name: /Submit/i });
    expect(buttonSubmit).toBeInTheDocument();

    await user.click(buttonSubmit);

    const errorName = await screen.findByText(/Name must be at least 6 characters long./i);
    expect(errorName).toBeInTheDocument();
    expect(inputName).not.toHaveValue('');
    const errorRequiredCity = await screen.findByText(/City is required./i);
    expect(errorRequiredCity).toBeInTheDocument();
    expect(inputCode).not.toHaveValue('');
    const errorRequiredZip = screen.queryByText(/Zip code is required./i);
    expect(errorRequiredZip).not.toBeInTheDocument();
    const errorRequiredStreet = screen.queryByText(/Street is required./i);
    expect(errorRequiredStreet).not.toBeInTheDocument();
    const errorCode = await screen.findByText(/Zip code must be at least 5 characters long./i);
    expect(errorCode).toBeInTheDocument();
  });

  it('should show an alert with confirmation message if data was successfully sent, alert should be closable', async () => {
    render(<AddUpdateEmployer />);
    const user = userEvent.setup();

    const inputName = screen.getByLabelText<HTMLElement>(/Name/i);
    await user.type(inputName, 'LT - CoherentSolutions');

    const inputCode = screen.getAllByLabelText<HTMLElement>(/Code/i);
    await user.type(inputCode[0], 'LT');

    const inputStreet = screen.getByLabelText<HTMLElement>(/Street/i);
    await user.type(inputStreet, 'Test St');

    const inputCity = screen.getByLabelText<HTMLElement>(/City/i);
    await user.type(inputCity, 'Kaunas');

    const inputPhone = screen.getByLabelText<HTMLElement>(/Phone/i);
    await user.type(inputPhone, '+370 699 132230');

    const buttonSubmit = screen.getByRole<HTMLElement>('button', { name: /Submit/i });
    expect(buttonSubmit).toBeInTheDocument();

    await user.click(buttonSubmit);

    await mockAlert(user, 'Successfully created.');
  }, 10000);

  it('should show an alert with error message if there is server error', async () => {
    server.resetHandlers(
      rest.post('http://localhost:8000/employers', (req, res, ctx) => res(ctx.status(500))),
    );
    render(<AddUpdateEmployer />);
    const user = userEvent.setup();

    const inputName = screen.getByLabelText<HTMLElement>(/Name/i);
    await user.type(inputName, 'BY - something');

    const inputCode = screen.getAllByLabelText<HTMLElement>(/Code/i);
    await user.type(inputCode[0], 'by');

    const inputStreet = screen.getByLabelText<HTMLElement>(/Street/i);
    await user.type(inputStreet, 'debesu');

    const inputCity = screen.getByLabelText<HTMLElement>(/City/i);
    await user.type(inputCity, 'paris');

    const inputPhone = screen.getByLabelText<HTMLElement>(/Phone/i);
    await user.type(inputPhone, '+370 699 13990');

    const buttonSubmit = screen.getByRole<HTMLElement>('button', { name: /Submit/i });
    expect(buttonSubmit).toBeInTheDocument();

    await user.click(buttonSubmit);

    await mockAlert(user, 'Request failed with status code 500');
  }, 10000);

  it('should display initial form view and no validation errors if cancel button was clicked', async () => {
    render(<AddUpdateEmployer />);
    const user = userEvent.setup();
    const inputName = screen.getByLabelText<HTMLElement>(/Name/i);
    await user.type(inputName, 'BY');

    const inputCode = screen.getAllByLabelText<HTMLElement>(/Code/i);
    await user.type(inputCode[0], 'n');

    const buttonCancel = screen.getByRole('button', { name: /Cancel/i });
    expect(buttonCancel).toBeInTheDocument();

    await user.click(buttonCancel);

    expect(screen.queryByText(/Name must be at least 6 characters long./i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Code must be at least 2 characters long./i)).not.toBeInTheDocument();
    expect(inputName).not.toHaveValue('');
  });
});
