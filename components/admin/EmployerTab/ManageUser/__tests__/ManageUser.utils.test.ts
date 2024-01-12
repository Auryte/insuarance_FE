import { mockEmployerUser } from '@/mocks/mockUsers';
import { conditionalSchema, generatePassword, random } from '../ManageUserForm.utils';

describe('Manage User form utils - Conditional validation schema', () => {
  it('validation schema with selected user, required fields', async () => {
    const schema = conditionalSchema(mockEmployerUser);
    await expect(schema.validateAt('firstName', { name: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('lastName', { name: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('email', { name: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('username', { name: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('password', { name: '' })).resolves.not.toThrowError(
      /is required/,
    );
  });
  it('validation schema with selected user, requires valid password or skips validation when empty field', async () => {
    const schema = conditionalSchema(mockEmployerUser);
    await expect(schema.validateAt('password', { password: '223' })).rejects.toThrowError(
      /Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character./,
    );
    await expect(schema.validateAt('password', { password: 'Admin123' })).rejects.toThrowError(
      /Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character./,
    );
    await expect(schema.validateAt('password', { password: 'Admin#1234' })).resolves.toBeTruthy();
    await expect(schema.validateAt('password', { password: '' })).resolves.not.toThrowError(
      /is required/,
    );
  });
  it('validation schema without selected user, required fields', async () => {
    const schema = conditionalSchema(undefined);
    await expect(schema.validateAt('firstName', { name: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('lastName', { name: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('email', { name: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('username', { name: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('password', { name: '' })).rejects.toThrowError(/is required/);
  });
  it('validation schema witout selected user, requires valid password', async () => {
    const schema = conditionalSchema(mockEmployerUser);
    await expect(schema.validateAt('password', { password: '223' })).rejects.toThrowError(
      /Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character./,
    );
    await expect(schema.validateAt('password', { password: 'Admin123' })).rejects.toThrowError(
      /Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character./,
    );
    await expect(schema.validateAt('username', { name: '' })).rejects.toThrowError(/is required/);
    await expect(schema.validateAt('password', { password: 'Admin#1234' })).resolves.toBeTruthy();
  });
});

describe('Manage User form utils, validate generate password function', () => {
  it('generates password which contains 12 characters', () => {
    const password = generatePassword();
    expect(password).toHaveLength(12);
  });
  it('generates password which contains at least one uppercase letter, one lowercase letter, one number and one special character.', () => {
    const password = generatePassword();
    expect(password).toMatch(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i);
  });

  it('Random - generates random number without args', () => {
    const randomNumber = random();
    expect(randomNumber.toString()).toHaveLength(1);

    expect(randomNumber.toString()).toMatch(/^[0-9]*$/i);
  });
});
