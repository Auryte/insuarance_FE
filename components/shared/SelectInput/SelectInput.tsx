import { MenuProps } from '@/styles/styled';
import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material';
import React, { ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';

interface SelectInputProps {
  children: ReactNode;
  control: Control<any>;
  labelId: string;
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
}

const SelectInput = ({
  labelId,
  label,
  name,
  children,
  required = false,
  disabled,
  control,
}: SelectInputProps) => (
  <Controller
    control={control}
    name={name}
    defaultValue={''}
    render={({ field, fieldState: { error } }) => (
      <FormControl fullWidth size="small">
        <InputLabel id={labelId} required={required} error={error !== undefined}>
          {label}
        </InputLabel>
        <Select
          {...field}
          disabled={disabled}
          labelId={labelId}
          label={label}
          size="small"
          fullWidth
          name={name}
          id={labelId}
          error={error !== undefined}
          MenuProps={MenuProps}
        >
          {children}
        </Select>
        {error && (
          <FormHelperText error sx={{ marginLeft: '14px' }}>
            {error.message}
          </FormHelperText>
        )}
      </FormControl>
    )}
  />
);

export default SelectInput;
