import '@testing-library/jest-dom';
import { formDataChecked } from '../ClaimsTab.utils';

describe('ClaimsTab utils - ckeck form data', () => {
  test('It should rplace "All claims" to "" in form data', () => {
    expect(
      formDataChecked({
        claimNumber: 'LT202212025555',
        employer: 'LT-coherent',
        selectStatus: 'All claims',
      }),
    ).toStrictEqual({
      claimNumber: 'LT202212025555',
      employer: 'LT-coherent',
      selectStatus: '',
    });
  });

  expect(
    formDataChecked({
      claimNumber: 'LT202212025555',
      employer: 'LT-coherent',
      selectStatus: 'pending',
    }),
  ).toStrictEqual({
    claimNumber: 'LT202212025555',
    employer: 'LT-coherent',
    selectStatus: 'pending',
  });
});
