import React, { FC } from 'react';
import { Controller, Control, Path } from 'react-hook-form';
import { TextField } from '@mui/material';

// Components
import { SearchFormInput } from '../ClaimsTab';

// Utils
import { capitalizeFirstLetter } from '@/utils/stringCorrections';

// Styles
import { inputWrapper } from '@/styles/styled';

export type FormInputParams = {
  control: Control<SearchFormInput>;
  name: Path<SearchFormInput>;
  type?: string;
  placeholder?: string;
};

const ClaimsInput: FC<FormInputParams> = ({ name, control, placeholder, type }) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        fullWidth
        variant="outlined"
        size="small"
        placeholder={placeholder}
        type={type}
        label={capitalizeFirstLetter(name)}
        error={error !== undefined}
        helperText={error ? error.message : ''}
        sx={inputWrapper}
      />
    )}
  />
);

export default ClaimsInput;
