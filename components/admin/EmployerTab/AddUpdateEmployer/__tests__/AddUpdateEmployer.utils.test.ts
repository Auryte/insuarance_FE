import { employerValidationSchema as schema } from '../AddUpdateEmployer.utils';

describe('employerValidationSchema', () => {
  it('requires valid name', async () => {
    await expect(schema.validateAt('name', { name: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('name', { name: 'abbbb' })).rejects.toThrowError(
      /Name must be at least 6 characters long./,
    );
    await expect(schema.validateAt('name', { name: 'bysomething' })).rejects.toThrowError(
      /Name must be in this format 'BY - issoft'./,
    );
    await expect(schema.validateAt('name', { name: 'BY - something' })).resolves.toBeTruthy();
  });

  it('requires valid code', async () => {
    await expect(schema.validateAt('code', { code: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('code', { code: 'by-something' })).rejects.toThrowError(
      /Code must be at most 2 characters long./,
    );
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

  it('requires valid city name', async () => {
    await expect(schema.validateAt('city', { city: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('city', { city: 'byc' })).rejects.toThrowError(
      /City must be at least 4 characters long./,
    );
    await expect(schema.validateAt('city', { city: 'by-222' })).rejects.toThrowError(
      /City can only contain Latin letters./,
    );
    await expect(schema.validateAt('city', { city: 'something' })).resolves.toBeTruthy();
  });

  it('requires valid phone', async () => {
    await expect(schema.validateAt('phone', { phone: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('phone', { phone: 'byc' })).rejects.toThrowError(
      /Phone number is not valid./,
    );
    await expect(schema.validateAt('phone', { phone: '+37000223322' })).resolves.toBeTruthy();
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

  it('requires valid state', async () => {
    await expect(schema.validateAt('state', { state: '223' })).rejects.toThrowError(
      /State must be at least 4 characters long./,
    );
    await expect(schema.validateAt('state', { state: '223444' })).rejects.toThrowError(
      /State can only contain Latin letters./,
    );
    await expect(schema.validateAt('state', { state: 'something' })).resolves.toBeTruthy();
  });
});
