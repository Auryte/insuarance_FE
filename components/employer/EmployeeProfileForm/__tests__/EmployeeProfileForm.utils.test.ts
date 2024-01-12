import { employeeValidationSchema as schema } from '../EmployeeProfileForm.utils';

describe('employeeValidationSchema', () => {
  it('requires valid username', async () => {
    await expect(schema.validateAt('username', { username: '' })).rejects.toThrowError(
      /is required/,
    );
    await expect(schema.validateAt('username', { username: 'ab' })).rejects.toThrowError(
      /Username must be at least 3 characters long./,
    );
    await expect(
      schema.validateAt('username', { username: 'aaaaaaaaaabbbbbbbbbbbbbbbbb' }),
    ).rejects.toThrowError(/Username must be at most 16 characters long./);
    await expect(schema.validateAt('username', { username: 'user' })).resolves.toBeTruthy();
  });

  it('requires valid email', async () => {
    await expect(schema.validateAt('email', { email: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('email', { email: 'adgsdg' })).rejects.toThrowError(
      /Email is not valid./,
    );
    await expect(schema.validateAt('email', { email: 'abc@abc.lt' })).resolves.toBeTruthy();
  });

  it('requires valid password', async () => {
    await expect(
      schema.validateAt(
        'password',
        { password: '' },
        {
          context: {
            isPasswordRequired: true,
          },
        },
      ),
    ).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('password', { password: 'adgsdg' })).rejects.toThrowError(
      /Password must consist of at least one upper case, one lower case Latin letter, one digit, one special character, and be at least 8 characters long./,
    );
    await expect(schema.validateAt('password', { password: 'Test#1234' })).resolves.toBeTruthy();
  });

  it('requires valid first name', async () => {
    await expect(schema.validateAt('firstName', { firstName: '' })).rejects.toThrowError(
      /is required/,
    );
    await expect(schema.validateAt('firstName', { firstName: 'ab' })).rejects.toThrowError(
      /First name must be at least 3 characters long./,
    );
    await expect(
      schema.validateAt('firstName', { firstName: 'aaaaaaaaaabbbbbbbbbbbbbbbbb' }),
    ).rejects.toThrowError(/First name must be at most 16 characters long./);
    await expect(schema.validateAt('firstName', { firstName: 'user' })).resolves.toBeTruthy();
  });

  it('requires valid last name', async () => {
    await expect(schema.validateAt('lastName', { lastName: '' })).rejects.toThrowError(
      /is required/,
    );
    await expect(schema.validateAt('lastName', { lastName: 'ab' })).rejects.toThrowError(
      /Last name must be at least 3 characters long./,
    );
    await expect(
      schema.validateAt('lastName', { lastName: 'aaaaaaaaaabbbbbbbbbbbbbbbbb' }),
    ).rejects.toThrowError(/Last name must be at most 16 characters long./);
    await expect(schema.validateAt('lastName', { lastName: 'user' })).resolves.toBeTruthy();
  });

  it('requires valid SSN', async () => {
    await expect(schema.validateAt('SSN', { SSN: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('SSN', { SSN: 'adgsdg' })).rejects.toThrowError(
      /SSN can only contain digits and must not be longer than 9 characters./,
    );
    await expect(schema.validateAt('SSN', { SSN: '123456789' })).resolves.toBeTruthy();
  });

  it('requires valid phone number', async () => {
    await expect(schema.validateAt('phone', { phone: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('phone', { phone: 'byc' })).rejects.toThrowError(
      /Phone number is not valid./,
    );
    await expect(schema.validateAt('phone', { phone: '+37000223322' })).resolves.toBeTruthy();
  });

  it('requires valid street name', async () => {
    await expect(schema.validateAt('street', { street: '' })).rejects.toThrowError(
      /Street is required./,
    );
    await expect(schema.validateAt('street', { street: 'byc' })).rejects.toThrowError(
      /Street must be at least 4 characters long./,
    );
    await expect(schema.validateAt('street', { street: 'by-222' })).rejects.toThrowError(
      /Street can only contain Latin letters./,
    );
    await expect(schema.validateAt('street', { street: 'something' })).resolves.toBeTruthy();
  });

  it('requires valid city', async () => {
    await expect(schema.validateAt('city', { city: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('city', { city: 'byc' })).rejects.toThrowError(
      /City must be at least 4 characters long./,
    );
    await expect(schema.validateAt('city', { city: 'by-222' })).rejects.toThrowError(
      /City can only contain Latin letters./,
    );
    await expect(schema.validateAt('city', { city: 'something' })).resolves.toBeTruthy();
  });

  it('requires valid state', async () => {
    await expect(schema.validateAt('state', { state: '223' })).rejects.toThrowError(
      /State must be at least 4 characters long./,
    );
    await expect(schema.validateAt('state', { state: '223444' })).rejects.toThrowError(
      /State can only contain Latin letters./,
    );
    await expect(schema.validateAt('state', { state: 'something' })).resolves.toBeTruthy();
  });

  it('requires valid zip', async () => {
    await expect(schema.validateAt('zipCode', { zipCode: '223' })).rejects.toThrowError(
      /Zip code must be at least 5 characters long./,
    );
    await expect(schema.validateAt('zipCode', { zipCode: '223444' })).rejects.toThrowError(
      /Zip code must be at most 5 characters long./,
    );
    await expect(schema.validateAt('zipCode', { zipCode: '23322' })).resolves.toBeTruthy();
  });
});
