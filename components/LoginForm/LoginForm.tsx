import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Avatar, Button, TextField, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AxiosError } from 'axios';

// Contexts
import { AuthContext, IAuthContext } from '@/contexts/AuthContext';

// Hooks
import useGetMounted from '@/hooks/useGetMounted';
import useErrorHandler from '@/hooks/useErrorHandler';

export type FormData = {
  username: string;
  password: string;
  serverError: string;
};

const LoginForm = () => {
  const { register, handleSubmit, setError, clearErrors, formState } = useForm<FormData>();
  const { errors } = formState;

  const { login, isUserAuthenticated } = useContext<IAuthContext>(AuthContext);
  const router = useRouter();
  const hasMounted = useGetMounted();
  const { handleErrors } = useErrorHandler();

  useEffect(() => {
    isUserAuthenticated() && router.push('/admin');
  }, [router, isUserAuthenticated]);

  if (!hasMounted) {
    return null;
  }

  const onFormSubmit = async (formData: FormData): Promise<void> => {
    try {
      await login(formData.username, formData.password);
    } catch (error) {
      if (error instanceof AxiosError) {
        handleErrors(error, setError, formState);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {!isUserAuthenticated() && (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            data-testid="login-form"
            component="form"
            onSubmit={handleSubmit(onFormSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={errors.username ? true : false}
              margin="normal"
              fullWidth
              data-testid="username"
              id="username"
              label="Username"
              autoComplete="username"
              helperText={errors.username ? 'Username is required.' : ''}
              {...register('username', { required: true })}
              onFocus={() => clearErrors('serverError')}
            />
            <TextField
              error={errors.password ? true : false}
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              data-testid="password"
              id="password"
              autoComplete="current-password"
              helperText={errors.password ? 'Password is required.' : ''}
              {...register('password', { required: true })}
              onFocus={() => clearErrors('serverError')}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default LoginForm;
