import * as yup from 'yup';
import { EmployerFormInputs } from '@/components/admin/EmployerTab/AddUpdateEmployer/AddUpdateEmployer';
import { AnySchema } from 'yup/lib/schema';

const latinCharsRegExp = /^[aA-zZ\s]+$/;
const numberRegExp = /^[0-9.]*$/;
const letterRegex = /^[a-zA-Z]+$/;
const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
const nameRegex = /^[A-Z]{2}\s*-\s*[a-zA-Z0-9_.\s]{3,50}$/;

export type Shape<Fields extends Record<string, unknown>> = {
  [Key in keyof Fields]: AnySchema<Fields[Key]>;
};

export const employerValidationSchema = yup.object<Shape<EmployerFormInputs>>().shape({
  name: yup
    .string()
    .required('Name is required.')
    .min(6, 'Name must be at least 6 characters long.')
    .max(50, 'Name must be at most 50 characters long.')
    .matches(nameRegex, "Name must be in this format 'BY - issoft'."),
  code: yup
    .string()
    .required('Code is required.')
    .min(2, 'Code must be at least 2 characters long.')
    .max(2, 'Code must be at most 2 characters long.')
    .matches(letterRegex, 'Code can only contain Latin letters.'),
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
    .nullable()
    .transform(value => (!value ? undefined : value))
    .min(4, 'State must be at least 4 characters long.')
    .max(30, 'State must be at most 30 characters long.')
    .matches(latinCharsRegExp, 'State can only contain Latin letters.'),
  zipCode: yup
    .string()
    .nullable()
    .transform((v, o) => (o === '' ? undefined : v))
    .min(5, 'Zip code must be at least 5 characters long.')
    .max(5, 'Zip code must be at most 5 characters long.')
    .matches(numberRegExp, 'Zip code can only contain numbers.'),
  phone: yup
    .string()
    .required('Phone number is required.')
    .matches(phoneRegExp, 'Phone number is not valid.'),
});
