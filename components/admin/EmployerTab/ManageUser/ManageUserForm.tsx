import React, { FC, useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

//Components
import FormInput from '@/components/shared/FormInput/FormInput';
import EmployerTabTitle from '../EmployerTabTitle/EmployerTabTitle';
import MuiButton from '@/components/shared/MuiButton/MuiButton';

// Contexts
import { useSnackbar } from '@/contexts/SnackbarContext';
import EmployerContext from '@/contexts/EmployerContext';

// Api
import { createUser, updateUserEmployer } from '@/pages/api/userApi';

// Styles
import { formBoxWrapper, gridBoxWrapper, boxStylesAlternative } from '@/styles/styled';
import { Box, Grid, IconButton, InputAdornment } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

//Types
import { User, UserRole } from '@/types/user';
import { SnackbarType } from '@/types/snackbar';
import { ManageUsersFormProps } from './ManageUserForm.types';

// Utils
import { generatePassword, conditionalSchema } from './ManageUserForm.utils';

const ManageUserForm: FC<ManageUsersFormProps> = ({ selectedUser, handleClick, handleReload }) => {
  const { employer } = useContext(EmployerContext);
  const { handleErrors } = useErrorHandler();
  const [showPassword, setShowPassword] = useState(false);
  const { showSnackbar } = useSnackbar();

  const { handleSubmit, reset, control, formState, setError, getValues } = useForm<User>({
    defaultValues: {
      firstName: selectedUser ? selectedUser.firstName : '',
      lastName: selectedUser ? selectedUser.lastName : '',
      email: selectedUser ? selectedUser.email : '',
      username: selectedUser ? selectedUser.username : '',
      password: '',
    },
    resolver: yupResolver(conditionalSchema(selectedUser)),
  });

  const handleSubmitForm = async (formData: User): Promise<void> => {
    try {
      if (!Boolean(formData.password) && selectedUser) {
        delete formData.password;
      }
      if (!selectedUser) {
        formData.role = UserRole.employer;
        employer && (await createUser(formData, employer.id));
        showSnackbar('User created successfully.', SnackbarType.success);
      } else {
        await updateUserEmployer(selectedUser.id, formData);
        showSnackbar('User updated successfully.', SnackbarType.success);
      }
      handleClick();
      handleReload();
    } catch (error) {
      if (error instanceof AxiosError) {
        handleErrors(error, setError, formState);
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleGeneratePassword = () => {
    const password = generatePassword();
    reset({ ...getValues(), password });
  };

  return (
    <Box sx={{ ...gridBoxWrapper }}>
      <EmployerTabTitle />
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleSubmitForm)}
        sx={formBoxWrapper}
      >
        <Box sx={boxStylesAlternative}>
          <Grid container spacing={3}>
            <FormInput control={control} name="firstName" required type="text" />
            <FormInput control={control} name="lastName" required type="text" />
            <FormInput control={control} name="email" required type="text" />
            <FormInput control={control} name="username" required type="text" />
            <FormInput
              control={control}
              name="password"
              required={!Boolean(selectedUser)}
              type={showPassword ? 'text' : 'password'}
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
          <MuiButton sx={{ ml: 2 }} onClick={handleClick}>
            Cancel
          </MuiButton>
          <MuiButton type="submit" sx={{ ml: 2 }}>
            Submit
          </MuiButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageUserForm;
