import { rest } from 'msw';

// Types
import { Employer } from '@/types/employer';
import { UserRole, UsersData } from '@/types/user';
import { Claim, ClaimsData } from '@/types/adminTypes';
import { PlanYear } from '@/types/insurance';
import { ImageUpload } from '@/types/file';
import { Enrollment } from '@/types/enrollment';
import { User } from '@/types/user';

// Mocks
import { mockClaimProps, mockClaimsData } from './mockClaims';
import { mockPlanYear, mockPlanYears } from './mockPlanYear';
import { mockConsumerUsers, mockEmployerUsers } from './mockUsers';
import { mockEnrollments } from './mockEnrollments';
import { mockUsersForEmployeeTable } from './mockUser';

// Constants
import { mockEmployer } from './mockEmployer';
import { baseURL, TOKEN_LOCALSTORAGE_LABEL } from '@/constants/constants';

// Services
import { getFromLocalStorage } from '@/services/localStorage';

const accessToken: string | null | undefined = getFromLocalStorage(TOKEN_LOCALSTORAGE_LABEL);

export const handlers = [
  rest.post(`${baseURL}/employers`, (req, res, ctx) =>
    res(
      ctx.json<Employer>({
        name: 'BY - issoft',
        code: 'by',
        street: 'Debesu',
        city: 'Kaunas',
        state: 'Kaunas',
        zipCode: '55555',
        phone: '+37069933322',
        logo: 'https://res.cloudinary.com/dwpxztrya/image/upload/v1671466641/logo/mz41iqipldzohftdex4k.jpg',
        id: '4645684532122',
        claimFilling: true,
        addConsumers: true,
      }),
    ),
  ),

  rest.patch(`${baseURL}/employers/:id`, (req, res, ctx) => {
    const { id } = req.params;

    return res(
      ctx.delay(200),
      ctx.status(200),
      ctx.json<Employer>({
        name: 'BY - issoft',
        code: 'by',
        street: 'Debesu',
        city: 'Kaunas',
        state: 'Kaunas',
        zipCode: '55555',
        phone: '+37069933322',
        logo: 'https://res.cloudinary.com/dwpxztrya/image/upload/v1671466641/logo/mz41iqipldzohftdex4k.jpg',
        id: id,
        claimFilling: true,
        addConsumers: true,
      }),
    );
  }),

  rest.get(`${baseURL}/claims`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const number = query.getAll('number');
    const employer = query.getAll('employer');
    const status = query.getAll('status');
    const page = query.getAll('page');
    const limit = query.getAll('limit');

    const searchedData: ClaimsData = { data: [], metadata: mockClaimsData.metadata };
    mockClaimsData.data.map((claim: Claim) => {
      if (
        claim.employer.name === employer[0] ||
        claim.number === number[0] ||
        claim.status === status[0]
      ) {
        searchedData.data.push(claim);
      }
    });
    return res(
      ctx.json<ClaimsData>(
        !!searchedData.data.length ||
          ((!!employer[0] || !!number[0] || !!status[0]) && !searchedData.data.length)
          ? searchedData
          : mockClaimsData,
      ),
    );
  }),

  rest.patch(`${baseURL}/claims/93756571-fc74-42be-a71f-026610a628d0`, (req, res, ctx) =>
    res(ctx.delay(0), ctx.status(200), ctx.json<Claim>(mockClaimProps)),
  ),

  rest.patch(
    `${baseURL}/employers/6161a553-20f6-46ba-b7ca-7f6c55645708/plans/bbe1ca2b-95e4-4a6c-90b8-ac9b8fd795e7`,
    (req, res, ctx) => res(ctx.delay(0), ctx.status(200), ctx.json<PlanYear>(mockPlanYear)),
  ),

  rest.get(`${baseURL}/employers/6161a553-20f6-46ba-b7ca-7f6c55645708/plans`, (req, res, ctx) =>
    res(ctx.delay(0), ctx.status(200), ctx.json<PlanYear[]>(mockPlanYears)),
  ),

  rest.delete(
    `${baseURL}/employers/6161a553-20f6-46ba-b7ca-7f6c55645708/plans/bbe1ca2b-95e4-4a6c-90b8-ac9b8fd795e7`,
    (req, res, ctx) =>
      res(
        ctx.delay(0),
        ctx.status(200),
        ctx.json<{ message: string }>({ message: 'Plan deleted successfully.' }),
      ),
  ),

  rest.patch(
    `${baseURL}/employers/6161a553-20f6-46ba-b7ca-7f6c55645708/plans/bbe1ca2b-95e4-4a6c-90b8-ac9b8fd795e7/initialize`,
    (req, res, ctx) =>
      res(
        ctx.delay(0),
        ctx.status(200),
        ctx.json<PlanYear>({
          ...mockPlanYears[0],
          endDate: '2023-12-13T21:00:00.000Z',
          initialized: true,
          initializedAt: '2023-12-13T21:00:00.000Z',
        }),
      ),
  ),

  rest.patch(`${baseURL}/claims/93756571-fc74-42be-a71f-026610a628d0`, (req, res, ctx) =>
    res(ctx.delay(0), ctx.status(200), ctx.json<Claim>(mockClaimProps)),
  ),

  rest.get(`${baseURL}/employers/6161a553-20f6-46ba-b7ca-7f6c55645708/users`, (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') || '1', 10);
    const limit = 8;

    const result = mockEmployerUsers.slice((page - 1) * limit, limit * page);

    return res(
      ctx.delay(0),
      ctx.status(200),
      ctx.json<UsersData>({
        metadata: [
          {
            numberOfDocuments: 15,
            page: 1,
            pageSize: 8,
          },
        ],
        data: result,
      }),
    );
  }),

  rest.get(`${baseURL}/users/ac2489c9-9e98-48a6-bafc-4f9e159bfeae/users`, (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') || '1', 10);
    const limit = 10;
    const firstName = req.url.searchParams.get('firstName');

    let result = mockUsersForEmployeeTable.slice((page - 1) * limit, limit * page);
    if (firstName) {
      result = result.filter(el => el.firstName === firstName);
    }
    return res(
      ctx.delay(0),
      ctx.status(200),
      ctx.json({
        metadata: [
          {
            numberOfDocuments: 15,
            page: 1,
            pageSize: 10,
          },
        ],
        data: result,
      }),
    );
  }),

  rest.post(`${baseURL}/image/upload`, (req, res, ctx) =>
    res(
      ctx.delay(0),
      ctx.status(200),
      ctx.json<ImageUpload>({
        status: true,
        message: 'Logo successfully uploaded.',
        data: 'https://res.cloudinary.com/dwpxztrya/image/upload/v1671466641/logo/mz41iqipldzohftdex4k.jpg',
      }),
    ),
  ),

  rest.get(`${baseURL}/users/:consumerID/enrollments`, (req, res, ctx) => {
    const { consumerID } = req.params;
    const searchedData: Enrollment[] = mockEnrollments.filter(
      (enroll: Enrollment) => enroll.consumerID === consumerID,
    );
    return res(ctx.delay(0), ctx.status(200), ctx.json<Enrollment[]>(searchedData));
  }),

  rest.get(`${baseURL}/users/:consumerID`, (req, res, ctx) => {
    const { consumerID } = req.params;
    const searchedData: User | undefined = mockConsumerUsers.find(
      (user: User) => user.id === consumerID,
    );
    return searchedData && res(ctx.delay(0), ctx.status(200), ctx.json<User>(searchedData));
  }),

  rest.patch(`${baseURL}/users/:employerID/users/:consumerID`, (req, res, ctx) => {
    const { consumerID } = req.params;
    console.log(consumerID);
    const searchedData: User | undefined = mockConsumerUsers.find(
      (user: User) => user.id === consumerID,
    );
    return searchedData && res(ctx.delay(0), ctx.status(200), ctx.json<User>(searchedData));
  }),

  rest.patch(`${baseURL}/users/:consumerID/enrollments/:id`, async (req, res, ctx) => {
    const { consumerID, id } = req.params;
    const searchedData: Enrollment[] = mockEnrollments.filter(
      (enroll: Enrollment) => enroll.consumerID === consumerID,
    );
    const searchedEnrollment: Enrollment | undefined = searchedData.find(
      (enroll: Enrollment) => enroll.id === id,
    );
    const enrollmentIndex = searchedData.findIndex((enroll: Enrollment) => enroll.id === id);
    const { election, planID } = req.body as {
      election: number | null | undefined;
      planID: string;
    };
    const updatedEnrollment: Enrollment | undefined = searchedEnrollment && {
      ...searchedEnrollment,
      election,
      planID,
    };
    const mockEnrollmentsUpdated =
      updatedEnrollment && searchedData.splice(enrollmentIndex, 1, updatedEnrollment);
    return (
      updatedEnrollment && (await res(ctx.status(200), ctx.json<Enrollment>(updatedEnrollment)))
    );
  }),

  rest.post(
    `${baseURL}/users/f24ad404-f09a-4c4e-a3fe-74a775b2fed7/enrollments`,
    (req, res, ctx) => {
      const { consumerId } = req.params;
      const { election, planID } = req.body as {
        election: number | null | undefined;
        planID: string;
      };
      return res(
        ctx.json<Enrollment>({
          id: 'f24ad404-f09a-4c4e-a3fe-74a775b2777',
          consumerID: consumerId,
          planID: planID,
          election: election,
          plan: { ...mockPlanYear },
        }),
      );
    },
  ),

  rest.patch(
    `${baseURL}/employers/ac2489c9-9e98-48a6-bafc-4f9e159bfeae/manage-rules`,
    (req, res, ctx) => res(ctx.delay(0), ctx.status(200), ctx.json<Employer>(mockEmployer)),
  ),

  rest.post(`${baseURL}/users/:employerID/users`, async (req, res, ctx) => {
    const { employerId } = req.params;
    const { firstName, lastName, email, username, password } = req.body as {
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      password?: string;
    };
    return await res(
      ctx.set({ Authorization: `Bearer ${accessToken}` }),
      ctx.status(200),
      ctx.json<User>({
        id: 'd280da1d-450b-49df-9e74-61e89c069d00',
        username,
        email,
        role: UserRole.employer,
        firstName,
        lastName,
        password,
        employerID: employerId,
      }),
    );
  }),

  rest.patch(`${baseURL}/users/d280da1d-450b-49df-9e74-61e89c069d00`, async (req, res, ctx) => {
    const { id } = req.params;
    const searchedUser: User[] = mockEmployerUsers.filter((user: User) => user.id === id);

    const { firstName, lastName, email, username, password } = req.body as {
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      password?: string;
    };
    const updatedUser = searchedUser && {
      ...searchedUser,
      firstName,
      lastName,
      email,
      username,
      password,
    };

    return await res(
      ctx.set({ Authorization: `Bearer ${accessToken}` }),
      ctx.status(200),
      ctx.json<Omit<User, 'id' | 'employerID' | 'employer' | 'role'>>(updatedUser),
    );
  }),
];
