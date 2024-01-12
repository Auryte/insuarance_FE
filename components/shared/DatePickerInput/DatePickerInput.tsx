import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';

interface DatePickerProps {
  label: string;
  name: string;
  control: Control<any>;
  onChange: (value: any) => void;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  value?: string;
}

const DatePickerInput: FC<DatePickerProps> = ({
  label,
  name,
  disabled,
  onChange,
  minDate,
  maxDate,
  control,
  value,
}: DatePickerProps) => (
  <Controller
    control={control}
    name={name}
    defaultValue={value}
    render={({ field, fieldState: { error } }) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={field.value}
          disabled={disabled}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              required
              size="small"
              fullWidth
              name={name}
              error={error !== undefined}
              helperText={error ? error.message : ''}
            />
          )}
        />
      </LocalizationProvider>
    )}
  />
);

export default DatePickerInput;
