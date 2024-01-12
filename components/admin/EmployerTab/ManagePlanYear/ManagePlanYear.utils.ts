import * as yup from 'yup';
import { ManagePlanYearInputs } from '@/components/admin/EmployerTab/ManagePlanYear/ManagePlanYear';
import { AnySchema } from 'yup/lib/schema';

import { PlanType, PayrollFrequency } from '@/types/insurance';

const nameRegex = /^[A-Za-z_ ]{3,50}$/;

type Shape<Fields extends Record<string, unknown>> = {
  [Key in keyof Fields]: AnySchema<Fields[Key]>;
};

export const planYearValidationSchema = yup.object<Shape<ManagePlanYearInputs>>().shape({
  name: yup
    .string()
    .required('Name is required.')
    .min(3, 'Name must be at least 3 characters.')
    .max(50, 'Name must be at most 50 characters.')
    .matches(nameRegex, "Name must be in this format 'General Medical Insurance'"),
  contributions: yup
    .string()
    .required('Contributions is required.')
    .min(1, 'Contributions must be at least 1 characters.')
    .max(4, 'Contributions must be at most 4 characters.'),
  payrollFrequency: yup
    .mixed()
    .oneOf([PayrollFrequency.monthly, PayrollFrequency.weekly], 'Payroll frequency is required.')
    .required('Payroll frequency is required.'),
  type: yup
    .mixed()
    .oneOf([PlanType.dental, PlanType.medical], 'Plan type is required.')
    .required('Plan type is required.'),
  startDate: yup.string().required('Start date is required.').nullable(),
  endDate: yup.string().required('End date is required.').nullable(),
});
