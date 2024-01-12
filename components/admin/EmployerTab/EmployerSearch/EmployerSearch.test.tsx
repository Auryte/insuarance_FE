import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import React from 'react';

import { localClient } from '@/utils/axiosInstance';
import EmployerTabMain from './EmployerSearch';

jest.mock('@/utils/axiosInstance');
const mockedlocalClient = localClient as jest.Mocked<typeof localClient>;

describe('Check if GET request is made', () => {
  test('It should execute UseEffect once if promise is resolved', async () => {
    mockedlocalClient.get.mockResolvedValue({
      data: {
        data: [
          {
            id: 'ifeoiheghihg',
            name: 'SomeName',
            code: '1235468',
            street: 'Main street',
            city: 'Sofia',
            phone: '08888888',
            state: 'State',
            zipCode: '123455',
          },
        ],
        metadata: [
          {
            numberOfDocuments: 1,
          },
        ],
      },
    });

    await act(async () => {
      await waitFor(() => render(<EmployerTabMain />));
    });
    expect(mockedlocalClient.get).toHaveBeenCalledTimes(1);
  });

  test('It should execute UseEffect if promise is rejected', async () => {
    mockedlocalClient.get.mockRejectedValueOnce({
      message: 'Network Error',
      name: 'AxiosError',
      code: 'ERR_NETWORK',
    });

    await act(async () => {
      await waitFor(() => render(<EmployerTabMain />));
    });

    expect(mockedlocalClient.get).toHaveBeenCalled();
  });

  test('Check get request for getEmployers function if it is called with initial value', async () => {
    const mockGet = jest.fn();
    mockedlocalClient.get = mockGet;
    await act(async () => {
      await waitFor(() => render(<EmployerTabMain />));
    });
    expect(mockGet).toBeCalledWith('/employers?page=1&limit=8', {
      params: { code: '', name: '' },
    });
  });
});
