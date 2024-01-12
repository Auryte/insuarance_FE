import React, { FC } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, Control, Path } from 'react-hook-form';
import { formControlWrapper, MenuProps } from '@/styles/styled';
import { capitalizeFirstLetter } from '@/utils/stringCorrections';
import { SearchFormInput } from '../ClaimsTab';
import { ClaimFormInputs } from '../Claim/Claim';

export interface FormInputProps {
  name: Path<SearchFormInput | ClaimFormInputs>;
  control: Control<any>;
}
const selectFilters = ['All claims', 'Denied', 'Approved', 'Pending'] as const;
export type SelectFilterTypes = typeof selectFilters[number];

const SelectInputDropdown: FC<FormInputProps> = ({ name, control }) => {
  const generateFilterOptions = () =>
    selectFilters.map((filter: SelectFilterTypes) => (
      <MenuItem key={filter} value={filter}>
        {filter}
      </MenuItem>
    ));

  return (
    <FormControl size="small" sx={formControlWrapper}>
      <InputLabel>{capitalizeFirstLetter(name)}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value || ''} label={name} MenuProps={MenuProps}>
            {generateFilterOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};

export default SelectInputDropdown;
