import React from 'react';
import { render, screen } from '@/test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import { updateEmployer } from '../../../pages/api/employerApi';

const mockedUpdateEmployer = updateEmployer as jest.MockedFunction<
  (id: string, data: EmployerFormInputs) => Promise<Employer | undefined>
>;

jest.mock('../../../pages/api/employerApi');

import EmployerProfile from './EmployerProfile';
import { Employer } from '@/types/employer';
import { EmployerFormInputs } from '../../admin/EmployerTab/AddUpdateEmployer/AddUpdateEmployer';

const mockedEmployer: Employer = {
  city: 'Sofia',
  code: 'SA',
  id: 'f634658f-5639-4143-b9e4-2537cf30a76e',
  name: 'AA - CoherentSolutions',
  phone: '+370 699 13223322',
  state: 'Nevada',
  street: 'Main',
  zipCode: '55555',
  logo: 'https://res.cloudinary.com/dwpxztrya/image/upload/v1673525149/logo/q4rnu5zgs3njgpeppf13.jpg',
  addConsumers: true,
  claimFilling: true,
};

const secondMockedEmployer: Employer = {
  city: 'Pleven',
  code: 'PA',
  id: 'legiblrojoborjhbrorttt',
  name: 'Issoft-Pleven',
  phone: '088881001',
  state: 'Nevada',
  street: 'Main',
  zipCode: '55555',
  addConsumers: true,
  claimFilling: true,
};

describe('EmployerProfile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should render the base view elements', () => {
    render(<EmployerProfile employer={mockedEmployer} setEmployer={() => {}} />);
    const welcomeTitle = screen.getByTestId('welcome');
    const inputCode = screen.getByRole<HTMLInputElement>('textbox', { name: 'Code' });
    const inputName = screen.getByRole<HTMLInputElement>('textbox', { name: /name/i });
    const inputStreet = screen.getByRole<HTMLInputElement>('textbox', { name: /street/i });
    const inputCity = screen.getByRole<HTMLInputElement>('textbox', { name: /city/i });
    const inputState = screen.getByRole<HTMLInputElement>('textbox', { name: /state/i });
    const inputZip = screen.getByRole<HTMLInputElement>('textbox', { name: /zip/i });
    const inputPhone = screen.getByRole<HTMLInputElement>('textbox', { name: /phone/i });
    const logoWrapper = screen.getByTestId('logo-wrapper');
    const submitButtton = screen.getByText('Submit');
    const buttonCancel = screen.getByText('Cancel');

    const elements = [
      welcomeTitle,
      inputName,
      inputCode,
      inputStreet,
      inputCity,
      inputState,
      inputZip,
      inputPhone,
      logoWrapper,
      submitButtton,
      buttonCancel,
    ];
    elements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });
});

describe('EmployerProfile: validation and error messages', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should show error message if invalid name length of 4 symbols', async () => {
    render(<EmployerProfile employer={mockedEmployer} setEmployer={() => {}} />);
    const user = userEvent.setup();
    const inputName = screen.getByLabelText(/Name/i);
    await user.clear(inputName);
    await userEvent.type(inputName, 'ddsf');
    expect(inputName).toHaveValue('ddsf');

    const buttonSubmit = screen.getByRole('button', { name: /Submit/i });
    await user.click(buttonSubmit);
    const errorMessageName = await screen.findByText(/Name must be at least 6 characters long./i);
    expect(errorMessageName).toBeInTheDocument();
  });

  test('Should pass with valid name length of 6 symbols', async () => {
    render(<EmployerProfile employer={mockedEmployer} setEmployer={() => {}} />);
    const user = userEvent.setup();
    const inputName = screen.getByLabelText(/Name/i);
    await user.clear(inputName);
    await userEvent.type(inputName, 'ddsfaa');
    expect(inputName).toHaveValue('ddsfaa');

    const buttonSubmit = screen.getByRole('button', { name: /Submit/i });
    await user.click(buttonSubmit);
    const errorRequriedName = await screen.queryByText(/Name is required./i);
    expect(errorRequriedName).not.toBeInTheDocument();
  });

  test('Should show error message if invalid zip code length of 3 symbols', async () => {
    render(<EmployerProfile employer={mockedEmployer} setEmployer={() => {}} />);
    const user = userEvent.setup();
    const inputZipCode = screen.getByLabelText(/Zip Code/i);
    await user.clear(inputZipCode);
    await userEvent.type(inputZipCode, '123');
    expect(inputZipCode).toHaveValue('123');

    const buttonSubmit = screen.getByRole('button', { name: /Submit/i });
    await user.click(buttonSubmit);
    const errorMessageCode = await screen.findByText(
      /Zip code must be at least 5 characters long./i,
    );
    expect(errorMessageCode).toBeInTheDocument();
  });

  test('Should show error message if invalid zip code length of 6 symbols', async () => {
    render(<EmployerProfile employer={mockedEmployer} setEmployer={() => {}} />);
    const user = userEvent.setup();
    const inputZipCode = screen.getByLabelText(/Zip Code/i);
    await user.clear(inputZipCode);
    await userEvent.type(inputZipCode, '123456');
    expect(inputZipCode).toHaveValue('123456');

    const buttonSubmit = screen.getByRole('button', { name: /Submit/i });
    await user.click(buttonSubmit);
    const errorRequiredZioCode = await screen.findByText(
      /Zip code must be at most 5 characters long./i,
    );
    expect(errorRequiredZioCode).toBeInTheDocument();
  });

  test('Should show error message if invalid code length of 3 symbols', async () => {
    render(<EmployerProfile employer={mockedEmployer} setEmployer={() => {}} />);
    const user = userEvent.setup();
    const inputCode = screen.getByRole<HTMLInputElement>('textbox', { name: 'Code' });
    await user.clear(inputCode);
    await userEvent.type(inputCode, 'BYA');
    expect(inputCode).toHaveValue('BYA');

    const buttonSubmit = screen.getByRole('button', { name: /Submit/i });
    await user.click(buttonSubmit);
    const errorMessageCode = await screen.findByText(/Code must be at most 2 characters long./i);
    expect(errorMessageCode).toBeInTheDocument();
  });

  test('Should show error message if invalid street length of 3 symbols', async () => {
    render(<EmployerProfile employer={mockedEmployer} setEmployer={() => {}} />);
    const user = userEvent.setup();
    const inputStreet = screen.getByLabelText(/Street/i);
    await user.clear(inputStreet);
    await userEvent.type(inputStreet, 'Str');
    expect(inputStreet).toHaveValue('Str');

    const buttonSubmit = screen.getByRole('button', { name: /Submit/i });
    await user.click(buttonSubmit);
    const errorMessageStreet = await screen.findByText(
      /Street must be at least 4 characters long./i,
    );
    expect(errorMessageStreet).toBeInTheDocument();
  });

  test('Should show error message if invalid City length of 2 symbols', async () => {
    render(<EmployerProfile employer={mockedEmployer} setEmployer={() => {}} />);
    const user = userEvent.setup();
    const inputCity = screen.getByLabelText(/City/i);
    await user.clear(inputCity);
    await userEvent.type(inputCity, 'Ss');
    expect(inputCity).toHaveValue('Ss');

    const buttonSubmit = screen.getByRole('button', { name: /Submit/i });
    await user.click(buttonSubmit);
    const errorMessageCity = await screen.findByText(/City must be at least 4 characters long./i);
    expect(errorMessageCity).toBeInTheDocument();
  });

  test('Should show error message if invalid Phone length of 5 symbols', async () => {
    render(<EmployerProfile employer={mockedEmployer} setEmployer={() => {}} />);
    const user = userEvent.setup();
    const inputPhone = screen.getByLabelText(/Phone/i);
    await user.clear(inputPhone);
    await userEvent.type(inputPhone, '12345');
    expect(inputPhone).toHaveValue('12345');

    const buttonSubmit = screen.getByRole('button', { name: /Submit/i });
    await user.click(buttonSubmit);
    const errorMessagePhone = await screen.findByText(/Phone number is not valid./i);
    expect(errorMessagePhone).toBeInTheDocument();
  });

  test('Should render correct welcome message with the correct name of employer', async () => {
    render(<EmployerProfile employer={mockedEmployer} setEmployer={() => {}} />);
    const wellcomeMessage = await screen.findByText('Welcome AA - CoherentSolutions');
    expect(wellcomeMessage).toBeInTheDocument();
  });

  test("Shouldn't render welcome message with 'Welcome AA - CoherentSolutions' if employer name is 'Issoft-Pleven'", async () => {
    render(<EmployerProfile employer={secondMockedEmployer} setEmployer={() => {}} />);
    const wellcomeMessage = await screen.queryByText('Welcome AA - CoherentSolutions');
    expect(wellcomeMessage).not.toBeInTheDocument();
  });

  test('Should render logo is employer has logo property', async () => {
    render(<EmployerProfile employer={mockedEmployer} setEmployer={() => {}} />);
    const logo = await screen.queryByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  test("Shouldn't render logo is employer has no logo property", async () => {
    render(<EmployerProfile employer={secondMockedEmployer} setEmployer={() => {}} />);
    const logo = await screen.queryByTestId('logo');
    expect(logo).not.toBeInTheDocument();
  });

  test('It should call update user functioanlity once with correct data', async () => {
    render(<EmployerProfile employer={mockedEmployer} setEmployer={() => {}} />);
    const user = userEvent.setup();

    const inputName = screen.getByLabelText<HTMLElement>(/Name/i);
    await user.clear(inputName);
    await user.type(inputName, 'LT - CoherentSolutions');

    const inputCode = screen.getAllByLabelText<HTMLElement>(/Code/i);
    await user.clear(inputCode[0]);
    await user.type(inputCode[0], 'LT');

    const inputStreet = screen.getByLabelText<HTMLElement>(/Street/i);
    await user.clear(inputStreet);
    await user.type(inputStreet, 'Test St');

    const inputCity = screen.getByLabelText<HTMLElement>(/City/i);
    await user.clear(inputCity);
    await user.type(inputCity, 'Kaunas');

    const inputPhone = screen.getByLabelText<HTMLElement>(/Phone/i);
    await user.clear(inputPhone);
    await user.type(inputPhone, '+370 699 132230');

    const buttonSubmit = screen.getByRole<HTMLElement>('button', { name: /Submit/i });
    expect(buttonSubmit).toBeInTheDocument();

    await user.click(buttonSubmit);
    expect(mockedUpdateEmployer).toHaveBeenCalledTimes(1);
  });

  test('It should NOT call update user functioanlity with incorrect data', async () => {
    render(<EmployerProfile employer={mockedEmployer} setEmployer={() => {}} />);
    const user = userEvent.setup();

    const inputName = screen.getByLabelText<HTMLElement>(/Name/i);
    await user.clear(inputName);
    await user.type(inputName, 'LT - CoherentSolutions');

    const inputCode = screen.getAllByLabelText<HTMLElement>(/Code/i);
    await user.clear(inputCode[0]);
    await user.type(inputCode[0], 'INCORECT-Data');

    const buttonSubmit = screen.getByRole<HTMLElement>('button', { name: /Submit/i });
    expect(buttonSubmit).toBeInTheDocument();

    await user.click(buttonSubmit);
    expect(mockedUpdateEmployer).toHaveBeenCalledTimes(0);
  });
});
