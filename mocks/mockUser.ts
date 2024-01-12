import { Consumer } from '@/types/adminTypes';
import { UserRole } from '@/types/user';

const mockUser: Consumer = {
  username: 'employer',
  email: 'employer@example.com',
  firstName: 'employer',
  lastName: 'Lololol',
  SSN: '123456777',
  phone: '+370 68611012',
  street: 'Consumer St.',
  city: 'Vilnius',
  state: 'Vilnius',
  zipCode: '55555',
  employerID: 'ac2489c9-9e98-48a6-bafc-4f9e159bfeae',
  id: '88be0ddf-803d-4bdf-a477-17ad655e5essfd7fwfew',
};

export const mockDecodedToken = {
  _id: '63a5aa597bc7244690c47b36',
  username: 'employerUser',
  email: 'employermymy@mail.com',
  role: UserRole.employer,
  password: '$2b$12$CDhbkBJOZr33uSGNYJSDh.sTUdQ5eMjwBEaOvxDORDJPBKZFnlRN2',
  firstName: 'Maria',
  lastName: 'Ivanova',
  employerID: 'ac2489c9-9e98-48a6-bafc-4f9e159bfeae',
  id: '058502fe-d044-484c-a89e-f05837444ce2',
  createdAt: '2022-12-23T13:17:13.907Z',
  updatedAt: '2022-12-23T13:17:13.907Z',
  __v: 0,
  employer: {
    _id: '63a019c5b3bcd3189bdf5ea2',
    name: 'BY - MyMyss',
    code: 'BY',
    street: 'MyStreet',
    city: 'Silistra',
    phone: '375441234567',
    id: 'ac2489c9-9e98-48a6-bafc-4f9e159bfeae',
    createdAt: '2022-12-19T07:59:01.910Z',
    updatedAt: '2023-01-05T07:31:16.359Z',
    claimFilling: true,
    addConsumers: true,
    __v: 0,
    state: 'Washington',
    zipCode: '55555',
    logo: 'https://res.cloudinary.com/dwpxztrya/image/upload/v1671804355/logo/cnjcd9psg799wttwbeeq.png',
  },
};

export const mockUsersForEmployeeTable = Array.from({ length: 15 }, (v, i) => ({
  ...mockUser,
  id: mockUser.id + i,
}));

export const mockResponse = {
  metadata: [
    {
      numberOfDocuments: 15,
      page: 1,
      pageSize: 10,
    },
  ],
  data: mockUsersForEmployeeTable,
};
