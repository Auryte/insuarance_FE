import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import EmployerSearchForm from './EmployerSearchForm';

describe('Check if search inputs and search submit button are on screen', () => {
  test("'Employer name' search input should be visible on the screen.", () => {
    render(<EmployerSearchForm checkSearchParamas={() => {}} />);
    const inputEmployerName = screen.getByLabelText<HTMLElement>(/Employer name/i);
    expect(inputEmployerName).toBeInTheDocument();
  });

  test("'Employer Code' search input should be visible on the screen.", () => {
    render(<EmployerSearchForm checkSearchParamas={() => {}} />);
    const inputEmployerCode = screen.getByLabelText<HTMLElement>(/Employer Code/i);
    expect(inputEmployerCode).toBeInTheDocument();
  });

  test("'Search' buton should be visible on the screen.", () => {
    render(<EmployerSearchForm checkSearchParamas={() => {}} />);
    const buttonSearch = screen.getByRole<HTMLElement>('button', { name: /Search/i });
    expect(buttonSearch).toBeInTheDocument();
  });

  describe('When click on search button, form should have correct values', () => {
    test('Check if name and code inputs are not empty', async () => {
      render(<EmployerSearchForm checkSearchParamas={() => {}} />);
      const user = userEvent.setup();

      const inputEmployerName = screen.getByLabelText(/Employer name/i);
      await user.clear(inputEmployerName);
      await userEvent.type(inputEmployerName, 'BB-issoft');

      const inputCode = screen.getByLabelText(/Employer Code/i);
      await user.clear(inputCode);
      await userEvent.type(inputCode, 'BB');

      const buttonSearch = screen.getByRole<HTMLElement>('button', { name: /Search/i });
      await userEvent.click(buttonSearch);

      const formElement = screen.getByTestId('search-form');
      expect(formElement).toHaveFormValues({ searchEmployer: 'BB-issoft', searchCode: 'BB' });
    });
    test('Check if name input is not empty and code input is empty', async () => {
      render(<EmployerSearchForm checkSearchParamas={() => {}} />);
      const user = userEvent.setup();

      const inputEmployerName = screen.getByLabelText(/Employer name/i);
      await user.clear(inputEmployerName);
      await userEvent.type(inputEmployerName, 'BB-issoft');

      const buttonSearch = screen.getByRole<HTMLElement>('button', { name: /Search/i });
      await userEvent.click(buttonSearch);

      const formElement = screen.getByTestId('search-form');
      expect(formElement).toHaveFormValues({ searchEmployer: 'BB-issoft', searchCode: '' });
    });
    test('Check if name input is empty and code input is not empty', async () => {
      render(<EmployerSearchForm checkSearchParamas={() => {}} />);
      const user = userEvent.setup();

      const inputCode = screen.getByLabelText(/Employer Code/i);
      await user.clear(inputCode);
      await userEvent.type(inputCode, 'BB');

      const buttonSearch = screen.getByRole<HTMLElement>('button', { name: /Search/i });
      await userEvent.click(buttonSearch);

      const formElement = screen.getByTestId('search-form');
      expect(formElement).toHaveFormValues({ searchEmployer: '', searchCode: 'BB' });
    });
    test('Check if name and code inputs are empty', async () => {
      render(<EmployerSearchForm checkSearchParamas={() => {}} />);

      const buttonSearch = screen.getByRole<HTMLElement>('button', { name: /Search/i });
      await userEvent.click(buttonSearch);

      const formElement = screen.getByTestId('search-form');
      expect(formElement).toHaveFormValues({ searchEmployer: '', searchCode: '' });
    });

    describe("When click on search button 'getSearchParams' function should be called", () => {
      test("Check if 'getSearchParams' function is called when have form values", async () => {
        const name = 'BB-issoft';
        const code = 'BB';
        const callback = jest.fn();
        render(<EmployerSearchForm checkSearchParamas={callback} />);
        const user = userEvent.setup();

        const inputEmployerName = screen.getByLabelText(/Employer name/i);
        await user.clear(inputEmployerName);
        await userEvent.type(inputEmployerName, name);

        const inputCode = screen.getByLabelText(/Employer Code/i);
        await user.clear(inputCode);
        await userEvent.type(inputCode, code);

        const buttonSearch = screen.getByRole<HTMLElement>('button', { name: /Search/i });
        await userEvent.click(buttonSearch);

        expect(callback).toBeCalledWith(name, code);
      });
      test("Check if 'getSearchParams' function is called if form has no values", async () => {
        const callback = jest.fn();
        render(<EmployerSearchForm checkSearchParamas={callback} />);

        const buttonSearch = screen.getByRole<HTMLElement>('button', { name: /Search/i });
        await userEvent.click(buttonSearch);

        expect(callback).toBeCalled();
      });
    });
  });
});
