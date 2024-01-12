import * as yup from 'yup';
import { AnySchema } from 'yup/lib/schema';

// Types
import { User } from '@/types/user';
import { UserEmployerInputs } from './ManageUserForm.types';

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const userNameRegex = /^[A-Za-z0-9_ ]{3,16}$/;
const emailRegex = /\S+@\S+\.\S+/;
const nameRegex = /^[A-Za-z_ ]{3,16}$/;

export type Shape<Fields extends Record<string, unknown>> = {
  [Key in keyof Fields]: AnySchema<Fields[Key]>;
};

export const conditionalSchema = (selectedUser: User | undefined) =>
  yup.object<Shape<UserEmployerInputs>>().shape({
    firstName: yup
      .string()
      .required('First name is required.')
      .min(3, 'First name must be at least 3 characters long.')
      .max(16, 'First name be at most 16 characters long.')
      .matches(nameRegex, 'First name must consist of Latin letters.'),
    lastName: yup
      .string()
      .required('Last name is required.')
      .min(3, 'Last name must be at least 3 characters long.')
      .max(16, 'Last name be at most 16 characters long.')
      .matches(nameRegex, 'Last name must consist of Latin letters.'),
    email: yup
      .string()
      .required('Email is required.')
      .matches(emailRegex, 'Email must be a valid email.'),
    username: yup
      .string()
      .required('Username is required.')
      .min(4, 'Username must be at least 4 characters long.')
      .max(30, 'Username must be at most 30 characters long.')
      .matches(userNameRegex, 'Username must consist of Latin letters and numbers only.'),
    password: yup
      .string()
      .matches(
        passwordRegex,
        'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
      )
      .when([], {
        is: () => Boolean(selectedUser),
        then: yup
          .string()
          .nullable()
          .transform((v, o) => (o === '' ? undefined : v)),
        otherwise: yup.string().required('Password is required.'),
      }),
  });
export const random = (min = 0, max = 1) => Math.floor(Math.random() * (max + 1 - min) + min);

const randomLower = () => String.fromCharCode(random(97, 122));

const randomUpper = () => String.fromCharCode(random(65, 90));

const randomSymbol = () => {
  const symbols = '#?!@$%^&*-';
  return symbols[random(0, symbols.length - 1)];
};

export const generatePassword = () => {
  let password = '';
  for (let i = 0; i < 3; i++) {
    password += randomLower();
    password += randomUpper();
    password += randomSymbol();
    password += random(0, 9);
  }
  return password;
};
