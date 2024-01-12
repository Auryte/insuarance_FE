import * as yup from 'yup';
import { AnySchema } from 'yup/lib/schema';

// Types
import { Enrollment, EnrollmentsFormInputs } from '@/types/enrollment';
import { PlanYear } from '@/types/insurance';

const nameRegex = /^[A-Za-z_ ]{3,50}$/;

type Shape<Fields extends Record<string, unknown>> = {
  [Key in keyof Fields]: AnySchema<Fields[Key]>;
};

export const isEnroll = (enroll: Enrollment | PlanYear): enroll is Enrollment =>
  'consumerID' in enroll;

export const enrollmentValidation = yup.object<Shape<EnrollmentsFormInputs>>().shape({
  planName: yup
    .string()
    .required('Plan name is required.')
    .min(3, 'Name must be at least 3 characters.')
    .max(50, 'Name must be at most 50 characters.')
    .matches(nameRegex, "Name must be in this format 'General Medical Insurance'."),
  election: yup
    .number()
    .required('Election is required.')
    .positive('Election must be a positive number.')
    .typeError('Election should be a number.')
    .integer('Election must be an integer.'),
});
