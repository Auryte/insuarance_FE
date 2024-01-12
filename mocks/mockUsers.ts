import { User, UserRole, UsersData } from '@/types/user';

export const mockConsumerUsers: User[] = [
  {
    id: 'f24ad404-f09a-4c4e-a3fe-74a775b2fed7',
    firstName: 'Jonas',
    lastName: 'Jonaitis',
    username: 'Jonas',
    email: 'jonas@jonas.com',
    role: UserRole.consumer,
    phone: '+370 12345678',
    SSN: '123456789',
    street: 'Debesu',
    city: 'Kaunas',
    state: 'Kaunas',
    zipCode: '55555',
    employerID: '6161a553-20f6-46ba-b7ca-7f6c55645708',
    employer: {
      id: '6161a553-20f6-46ba-b7ca-7f6c55645708',
      name: 'AC - Coherent',
      code: 'AC',
      street: 'Employer str',
      city: 'Kaunas',
      phone: '03706899922233',
      state: 'Kaunas',
      zipCode: '55555',
      addConsumers: true,
      claimFilling: true,
    },
  },
  {
    id: 'f24ad404-f09a-4c4e-a3fe-74a775b2feeee',
    firstName: 'Petras',
    lastName: 'Petraitis',
    username: 'Petras',
    email: 'petras@jonas.com',
    role: UserRole.consumer,
    employerID: '6161a553-20f6-46ba-b7ca-7f6c55645708',
    employer: {
      id: '6161a553-20f6-46ba-b7ca-7f6c55645708',
      name: 'AC - Coherent',
      code: 'AC',
      street: 'Employer str',
      city: 'Kaunas',
      phone: '03706899922233',
      state: 'Kaunas',
      zipCode: '55555',
      addConsumers: true,
      claimFilling: true,
    },
  },
];

export const mockEmployerUser: User = {
  id: 'd280da1d-450b-49df-9e74-61e89c069d00',
  username: 'Admina',
  email: 'admina@valio.com',
  role: UserRole.employer,
  firstName: 'Admina',
  lastName: 'Adminaite',
  phone: '+370 68611012',
  street: 'Employer St.',
  city: 'Vilnius',
  state: 'Vilnius',
  zipCode: '55555',
  employerID: '6161a553-20f6-46ba-b7ca-7f6c55645708',
};

export const mockEmployerUsers: User[] = Array.from({ length: 15 }, (_, i) => ({
  ...mockEmployerUser,
  id: mockEmployerUser.id + i,
}));

export const mockEmployerUsersResponse: UsersData = {
  metadata: [
    {
      numberOfDocuments: 15,
      page: 1,
      pageSize: 10,
    },
  ],
  data: mockEmployerUsers,
};
