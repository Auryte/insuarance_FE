import React from 'react';
import { render, screen, waitFor, within } from '@/test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@storybook/testing-library';

import ConsumerClaim from '../Claim';
import { PlanType } from '@/types/insurance';
import { mockAlert } from '@/utils/testUtils';
import { mockClaimProps } from '@/mocks/mockClaims';

beforeEach(() => {
  mockClaimProps.changeViewToClaims = jest.fn();
});

describe('Claim', () => {
  it('should render component', () => {
    render(<ConsumerClaim {...mockClaimProps} />);

    const heading = screen.getByRole<HTMLElement>('heading', { name: /Claim Number/i });
    const consumerInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'Consumer' });
    const phoneInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'Phone' });
    const dateInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'Date of Service' });
    const planInput = screen.getByRole<HTMLInputElement>('button', { name: 'Plan Type' });
    const amountInput = screen.getByRole<HTMLInputElement>('spinbutton', { name: /amount/i });
    const buttonEdit = screen.getByRole<HTMLButtonElement>('button', { name: /Edit/i });
    const buttonApprove = screen.getByRole<HTMLButtonElement>('button', { name: /Approve/i });
    const buttonDeny = screen.getByRole<HTMLButtonElement>('button', { name: /Deny/i });
    const elements = [
      heading,
      consumerInput,
      phoneInput,
      dateInput,
      planInput,
      amountInput,
      buttonEdit,
      buttonApprove,
      buttonDeny,
    ];
    elements.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });

  it('input fields should contain preloaded data and should be disabled', async () => {
    render(<ConsumerClaim {...mockClaimProps} />);
    const user = userEvent.setup();

    const consumerInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'Consumer' });
    const phoneInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'Phone' });
    const dateInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'Date of Service' });
    const planInputParent = screen.getByLabelText(/Plan Type/i);
    const planInputDiv = await within(planInputParent).findByText(RegExp(PlanType.dental, 'i'));
    const planInput = document.querySelector('input[name="plan"]');
    const amountInput = screen.getByRole<HTMLInputElement>('spinbutton', { name: /amount/i });

    expect(consumerInput).toHaveValue('Sad Sadid');
    expect(phoneInput).toHaveValue(mockClaimProps.consumer.phone);
    expect(dateInput).toHaveValue('11/09/2022');
    expect(planInputDiv).toHaveTextContent('Dental');
    expect(amountInput).toHaveValue(mockClaimProps.amount);

    expect(consumerInput).toBeDisabled();
    expect(phoneInput).toBeDisabled();
    expect(dateInput).toBeDisabled();
    expect(planInput).toBeDisabled();
    expect(amountInput).toBeDisabled();
  });

  it('should make editable input fields enabled and make "Submit" + "Cancel" buttons appear after clicking "Edit"', async () => {
    render(<ConsumerClaim {...mockClaimProps} />);
    const user = userEvent.setup();

    const buttonEdit = screen.getByRole<HTMLButtonElement>('button', { name: /Edit/i });
    const dateInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'Date of Service' });
    const planInput = screen.getByRole<HTMLSelectElement>('button', { name: 'Plan Type' });

    const amountInput = screen.getByRole<HTMLInputElement>('spinbutton', { name: /amount/i });

    await user.click(buttonEdit);
    const buttonSubmit = screen.getByRole<HTMLElement>('button', { name: /Submit/i });
    const buttonCancel = screen.getByRole<HTMLElement>('button', { name: /Cancel/i });

    expect(dateInput).not.toBeDisabled();
    expect(planInput).not.toBeDisabled();
    expect(amountInput).not.toBeDisabled();
    expect(buttonSubmit).toBeInTheDocument();
    expect(buttonCancel).toBeInTheDocument();
  });

  it('should make input values the previous ones after "Cancel" click', async () => {
    render(<ConsumerClaim {...mockClaimProps} />);
    const user = userEvent.setup();

    const buttonEdit = screen.getByRole<HTMLButtonElement>('button', { name: /Edit/i });
    const dateInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'Date of Service' });
    const planInputParent = screen.getByLabelText(/Plan Type/i);
    const planInputDiv = await within(planInputParent).findByText(RegExp(PlanType.dental, 'i'));
    const amountInput = screen.getByRole<HTMLInputElement>('spinbutton', { name: /amount/i });

    await user.click(buttonEdit);
    const buttonCancel = screen.getByRole<HTMLElement>('button', { name: /Cancel/i });

    await user.type(dateInput, '11/25/2022');
    await user.type(planInputDiv, 'Medical');
    await user.type(amountInput, '200');
    await user.click(buttonCancel);
    expect(dateInput).toHaveValue('11/09/2022');
    expect(planInputDiv).toHaveTextContent(RegExp(mockClaimProps.plan.type, 'i'));
    expect(amountInput).toHaveValue(Number(mockClaimProps.amount));
  });

  it('should send new data to server and update form info after "Submit" click', async () => {
    render(<ConsumerClaim {...mockClaimProps} />);
    const user = userEvent.setup();

    const buttonEdit = screen.getByRole<HTMLButtonElement>('button', { name: /Edit/i });
    const dateInput = screen.getByLabelText(/Date of Service/i);
    const planInputParent = screen.getByLabelText(/Plan Type/i);
    const planInputDiv = await within(planInputParent).findByText(RegExp(PlanType.dental, 'i'));
    const amountInput = screen.getByRole<HTMLInputElement>('spinbutton', { name: /amount/i });
    console.log(dateInput.nodeValue);

    await user.click(buttonEdit);
    const buttonSubmit = screen.getByRole<HTMLElement>('button', { name: /Submit/i });

    fireEvent.change(dateInput, { target: { value: '11/25/2022' } });
    fireEvent.change(amountInput, { target: { value: '200' } });
    await user.click(buttonSubmit);

    expect(dateInput).toHaveValue('11/25/2022');
    expect(planInputDiv).toHaveTextContent(RegExp(mockClaimProps.plan.type, 'i'));
    expect(amountInput).toHaveValue(Number('200'));
  });

  it('should open confirmation popup after "Approve" click', async () => {
    render(<ConsumerClaim {...mockClaimProps} />);
    const user = userEvent.setup();

    const buttonApprove = screen.getByRole<HTMLButtonElement>('button', { name: /Approve/i });
    user.click(buttonApprove);
    const popup = await screen.findByText('Are you sure you want to approve this claim?');

    expect(popup).toBeInTheDocument();
  });

  it('should open confirmation popup after "Deny" click', async () => {
    render(<ConsumerClaim {...mockClaimProps} />);
    const user = userEvent.setup();

    const buttonDeny = screen.getByRole<HTMLButtonElement>('button', { name: /Deny/i });
    user.click(buttonDeny);
    const popup = await screen.findByText('Are you sure you want to deny this claim?');

    expect(popup).toBeInTheDocument();
  });

  it('after approving claim and clicking "Continue" user should be redirected to "Claims" page', async () => {
    render(<ConsumerClaim {...mockClaimProps} />);
    const user = userEvent.setup();

    const buttonApprove = screen.getByRole<HTMLButtonElement>('button', { name: /Approve/i });
    user.click(buttonApprove);
    const popupContinue = await screen.findByTestId('submit-popup');
    await user.click(popupContinue);

    await mockAlert(user, 'Successfully updated.');
    expect(mockClaimProps.changeViewToClaims).toHaveBeenCalledTimes(1);
  });

  it('after denying claim and clicking "Continue" user should be redirected to "Claims" page', async () => {
    render(<ConsumerClaim {...mockClaimProps} />);
    const user = userEvent.setup();

    const buttonDeny = screen.getByRole<HTMLButtonElement>('button', { name: /Deny/i });
    user.click(buttonDeny);
    const popupContinue = await screen.findByTestId('submit-popup');
    await user.click(popupContinue);

    await mockAlert(user, 'Successfully updated.');
    expect(mockClaimProps.changeViewToClaims).toHaveBeenCalledTimes(1);
  });

  it('should close confirmation popup when "Cancel" button is clicked', async () => {
    render(<ConsumerClaim {...mockClaimProps} />);
    const user = userEvent.setup();

    const buttonApprove = screen.getByRole<HTMLButtonElement>('button', { name: /Approve/i });
    user.click(buttonApprove);
    const popup = await screen.findByText('Are you sure you want to approve this claim?');
    const popupCancel = await screen.findByTestId('cancel-popup');
    await user.click(popupCancel);

    await waitFor(() => {
      expect(
        screen.queryByText('Are you sure you want to approve this claim?'),
      ).not.toBeInTheDocument();
    });
  });
});
