import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

// Components
import FormInput from '@/components/shared/FormInput/FormInput';
import MuiButton from '@/components/shared/MuiButton/MuiButton';
import { Box, Grid } from '@mui/material';

export interface SearchFormInput {
  lastName: string;
  firstName: string;
  SSN: string;
}

interface EmployeeSearchFormProps {
  handleOnSubmit: (data: SearchFormInput) => void;
}

const defaultFilters: SearchFormInput = { lastName: '', firstName: '', SSN: '' };

const EmployeeSearchForm: FC<EmployeeSearchFormProps> = ({ handleOnSubmit }) => {
  const { handleSubmit, control } = useForm<SearchFormInput>({
    defaultValues: defaultFilters,
  });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(handleOnSubmit)} sx={{ width: '100%' }}>
      <Grid container itemScope flexDirection="column" gap={'1rem'}>
        <Grid container item xs={12} md={12} justifyContent="space-between">
          <FormInput name="firstName" control={control} columnsWidth={3} />
          <FormInput name="lastName" control={control} columnsWidth={3} />
          <FormInput name="SSN" control={control} columnsWidth={3} />
          <MuiButton type="submit">Search</MuiButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeSearchForm;
