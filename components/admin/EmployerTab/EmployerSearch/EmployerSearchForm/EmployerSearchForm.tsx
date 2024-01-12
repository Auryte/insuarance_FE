import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, TextField, Grid } from '@mui/material';

// Styles
import { boxStyles, inputWrapper } from '@/styles/styled';
import { theme } from '@/styles/theme';

export interface EmployerSearchFormProps {
  checkSearchParamas: (name: string, code: string) => void;
}

type FormValues = {
  searchEmployer: string;
  searchCode: string;
};

const EmployerSearchForm: FC<EmployerSearchFormProps> = ({ checkSearchParamas }) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    const name = data.searchEmployer;
    const code = data.searchCode;
    checkSearchParamas(name, code);
  };

  return (
    <Box
      component="form"
      id="form"
      data-testid="search-form"
      onSubmit={handleSubmit(onSubmit)}
      sx={boxStyles}
    >
      <Grid container item xs={12} md={12} justifyContent="space-around">
        <TextField
          {...register('searchEmployer')}
          id="searchEmployer"
          className="text"
          label="Employer Name"
          variant="outlined"
          size="small"
          sx={{
            ...inputWrapper,
            width: '30%',
            [theme.breakpoints.up('md')]: {
              width: '30%',
            },
            [theme.breakpoints.up('lg')]: {
              width: '30%',
            },
          }}
        />
        <TextField
          {...register('searchCode')}
          id="searchCode"
          className="text"
          label="Employer Code"
          variant="outlined"
          size="small"
          sx={{
            ...inputWrapper,
            width: '30%',
            [theme.breakpoints.up('md')]: {
              width: '30%',
            },
            [theme.breakpoints.up('lg')]: {
              width: '30%',
            },
          }}
        />
        <Button variant="contained" type="submit" size="medium" sx={{ m: 2 }}>
          Search
        </Button>
      </Grid>
    </Box>
  );
};

export default EmployerSearchForm;
