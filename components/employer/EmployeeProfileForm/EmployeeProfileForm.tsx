import React, { FC, useEffect, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, InputAdornment, IconButton } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { AxiosError } from 'axios';

// Contexts
import { useSnackbar } from '@/contexts/SnackbarContext';

// Types
import { AuthContext } from '@/contexts/AuthContext';
import { SnackbarType } from '@/types/snackbar';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

// Api
import { getConsumer, updateConsumer } from '@/pages/api/userApi';

// Components
import FormInput from '@/components/shared/FormInput/FormInput';
import MuiButton from '@/components/shared/MuiButton/MuiButton';

// Api
import { createConsumer } from '@/pages/api/userApi';

// Styles
import { boxStylesAlternative, formBoxWrapper, gridBoxWrapper } from '@/styles/styled';

// Utils
import { employeeValidationSchema, filterUpdatedFormData } from './EmployeeProfileForm.utils';
import { generatePassword } from '@/components/admin/EmployerTab/ManageUser/ManageUserForm.utils';

export type EmployeeFormInputs = {
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  SSN: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

const EmployeeProfileForm: FC = () => {
  const { user } = useContext(AuthContext);
  const { open: snackbarOpen, showSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const { handleErrors } = useErrorHandler();

  const router = useRouter();
  const { consumerId } = router.query;

  const { handleSubmit, reset, control, formState, setError, getValues } =
    useForm<EmployeeFormInputs>({
      defaultValues: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        SSN: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        password: '',
      },

      context: { isPasswordRequired: !consumerId },
      resolver: yupResolver(employeeValidationSchema),
    });

  const getData = useCallback(
    async (consumerID: string | string[] | undefined) => {
      try {
        const response = await getConsumer(consumerID);
        reset(response, { keepDefaultValues: true });
      } catch (error) {
        if (error instanceof AxiosError) {
          handleErrors(error);
        }
      }
    },
    [reset],
  );

  useEffect(() => {
    if (consumerId) {
      getData(consumerId);
    }
  }, [router, consumerId, getData]);

  const handleSubmitForm = async (data: EmployeeFormInputs) => {
    try {
      if (!user) return;

      const { employerID } = user;

      if (!consumerId) {
        await createConsumer(employerID, { ...data, role: 'consumer' });
        showSnackbar('Successfully created.', SnackbarType.success);
        router.push('/employer/employees');
      } else {
        const filteredFormData = filterUpdatedFormData({ ...data }, [
          'employer',
          'employerID',
          'role',
          'id',
          'enrollments',
        ]);
        if (!filteredFormData.password) filteredFormData.password = undefined;
        const response = await updateConsumer(employerID, consumerId, filteredFormData);
        reset(response, { keepDefaultValues: true });
        showSnackbar('Successfully updated.', SnackbarType.success);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        handleErrors(error, setError, formState);
      }
    }
  };

  const handleCancelClick = () => {
    router.back();
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleGeneratePassword = () => {
    const password = generatePassword();
    reset({ ...getValues(), password }, { keepDefaultValues: true });
  };

  const formInputs = formState.defaultValues && Object.keys(formState.defaultValues);

  const getFormInputs = () =>
    formInputs?.map((formInput, index) => {
      let type = 'text';
      let required = true;
      if (formInput === 'email') type = 'email';
      if (formInput === 'password') {
        type = showPassword ? 'text' : 'password';
        required = !consumerId;

        return (
          <FormInput
            key={index}
            control={control}
            name={formInput}
            required={required}
            type={type}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );
      }

      return (
        <FormInput key={index} control={control} name={formInput} required={required} type={type} />
      );
    });

  return (
    <Box sx={{ ...gridBoxWrapper, py: 0, px: 1, mt: 1 }}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleSubmitForm)}
        sx={formBoxWrapper}
      >
        <Box sx={boxStylesAlternative}>
          <Grid container spacing={3}>
            {getFormInputs()}
            <MuiButton
              sx={{ mx: 3, mt: 3, maxHeight: '40px' }}
              variant="outlined"
              onClick={handleGeneratePassword}
            >
              Generate password
            </MuiButton>
          </Grid>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'right', mt: 5 }}>
          <Button variant="contained" size="medium" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button
            disabled={snackbarOpen}
            variant="contained"
            type="submit"
            size="medium"
            sx={{ ml: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeProfileForm;
