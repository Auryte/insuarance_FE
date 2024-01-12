import React, { FC } from 'react';
import { Controller, Control } from 'react-hook-form';

// Styles
import { Grid, OutlinedInputProps, TextField } from '@mui/material';

// Utils
import { capitalizeFirstLetter } from '@/utils/stringCorrections';

export type FormInputParams = {
  control: Control<any>;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  columnsWidth?: number;
  inputProps?: Partial<OutlinedInputProps>;
};

const FormInput: FC<FormInputParams> = ({
  control,
  name,
  type = 'text',
  required,
  placeholder,
  disabled,
  columnsWidth = 6,
  inputProps,
}) => (
  <Grid item xs={columnsWidth}>
    <Controller
      control={control}
      name={name}
      defaultValue={''}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          variant="outlined"
          size="small"
          placeholder={placeholder}
          required={required}
          type={type}
          label={capitalizeFirstLetter(name)}
          error={error !== undefined}
          helperText={error ? error.message : ''}
          disabled={disabled}
          InputProps={inputProps}
        />
      )}
    />
  </Grid>
);

export default FormInput;
