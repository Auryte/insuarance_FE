import * as yup from 'yup';
import { AnySchema } from 'yup/lib/schema';

import { EmployeeFormInputs } from './EmployeeProfileForm';

const usernameRegExp = /^[A-Za-z0-9_ ]{3,16}$/;
const nameRegExp = /^[A-Za-z_ ]{3,16}$/;
const latinCharsRegExp = /^[aA-zZ\s]+$/;
const numberRegExp = /^[0-9.]*$/;
const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const SSNRegExp = /(^[0-9]{9}$)|(^$)/;
const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

export type Shape<Fields extends Record<string, unknown>> = {
  [Key in keyof Fields]: AnySchema<Fields[Key]>;
};

export const employeeValidationSchema = yup.object<Shape<EmployeeFormInputs>>().shape({
  username: yup
    .string()
    .required('Username is required.')
    .min(3, 'Username must be at least 3 characters long.')
    .max(16, 'Username must be at most 16 characters long.')
    .matches(usernameRegExp, 'Username must consist of Latin letters and numbers only.'),
  email: yup.string().email('Email is not valid.').required('Email is required.'),
  password: yup.lazy(value => {
    if (value) {
      return yup
        .string()
        .matches(
          passwordRegExp,
          'Password must consist of at least one upper case, one lower case Latin letter, one digit, one special character, and be at least 8 characters long.',
        );
    }
    return yup.string().when('$isPasswordRequired', (isPasswordRequired, schema) => {
      if (isPasswordRequired) {
        return schema.required('Password is required.');
      }
      return schema;
    });
  }),
  firstName: yup
    .string()
    .required('First name is required.')
    .min(3, 'First name must be at least 3 characters long.')
    .max(16, 'First name must be at most 16 characters long.')
    .matches(nameRegExp, 'First name must consist of Latin letters.'),
  lastName: yup
    .string()
    .required('Last name is required.')
    .min(3, 'Last name must be at least 3 characters long.')
    .max(16, 'Last name must be at most 16 characters long.')
    .matches(nameRegExp, 'Last name must consist of Latin letters.'),
  SSN: yup
    .string()
    .required('SSN is required.')
    .max(9, 'SSN must be at most 9 characters long.')
    .matches(SSNRegExp, 'SSN can only contain digits and must not be longer than 9 characters.'),
  phone: yup
    .string()
    .required('Phone number is required.')
    .matches(phoneRegExp, 'Phone number is not valid.'),
  street: yup
    .string()
    .required('Street is required.')
    .min(4, 'Street must be at least 4 characters long.')
    .max(50, 'Street must be at most 50 characters long.')
    .matches(latinCharsRegExp, 'Street can only contain Latin letters.'),
  city: yup
    .string()
    .required('City is required.')
    .min(4, 'City must be at least 4 characters long.')
    .max(30, 'City must be at most 30 characters long.')
    .matches(latinCharsRegExp, 'City can only contain Latin letters.'),
  state: yup
    .string()
    .required('State is required.')
    .min(4, 'State must be at least 4 characters long.')
    .max(30, 'State must be at most 30 characters long.')
    .matches(latinCharsRegExp, 'State can only contain Latin letters.'),
  zipCode: yup
    .string()
    .required('Zip code is required.')
    .min(5, 'Zip code must be at least 5 characters long.')
    .max(5, 'Zip code must be at most 5 characters long.')
    .matches(numberRegExp, 'Zip code can only contain numbers.'),
});

export const filterUpdatedFormData = (data: EmployeeFormInputs, keysToFilter: string[]) =>
  Object.keys(data)
    .filter((key): boolean => !keysToFilter.includes(key))
    .reduce((obj, key): EmployeeFormInputs => {
      const k = key as keyof EmployeeFormInputs;
      obj[k] = data[k] as string;
      return obj;
    }, {} as EmployeeFormInputs);
