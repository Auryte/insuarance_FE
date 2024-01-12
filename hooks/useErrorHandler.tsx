import { UseFormSetError, FormState } from 'react-hook-form';
import { AxiosError } from 'axios';
import { AlertColor } from '@mui/material';

// Contexts
import { useSnackbar } from '@/contexts/SnackbarContext';

// Types
import { ServerError, ServerErrorField, Errors } from '@/types/error';
import { SnackbarType } from '@/types/snackbar';

const transformServerErrors = (fields: ServerErrorField[]) =>
  fields.reduce(
    (prevFields, { name, message }): Errors => ({
      ...prevFields,
      [name]: {
        type: 'server',
        message,
      },
    }),
    {},
  );

function addServerErrorsToForm<T>(
  showSnackbar: (text: string, typeColor: AlertColor) => void,
  errors: { [P in keyof T]?: { type: string; message: string } },
  setError: UseFormSetError<any>,
  formState?: FormState<any>,
) {
  return Object.keys(errors).forEach(key => {
    const message = errors[key as keyof T]?.message;

    if (formState?.defaultValues.hasOwnProperty(key)) {
      setError(key, {
        type: 'server',
        message,
      });
    } else {
      message && showSnackbar(message, SnackbarType.error);
    }
  });
}

const useErrorHandler = () => {
  const { showSnackbar } = useSnackbar();

  const handleErrors = (
    serverError: AxiosError<ServerError>,
    setError?: UseFormSetError<any>,
    formState?: FormState<any>,
  ) => {
    const isCustomError = serverError.response?.data;
    const { fields, message } = isCustomError || {};

    if (isCustomError && fields && setError && formState) {
      const errors = transformServerErrors(fields);
      addServerErrorsToForm(showSnackbar, errors, setError, formState);
    } else if (isCustomError && message) {
      showSnackbar(message, SnackbarType.error);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        showSnackbar(serverError.message, SnackbarType.error);
      } else {
        showSnackbar('Something went wrong.', SnackbarType.error);
      }
    }
  };

  return { handleErrors };
};

export default useErrorHandler;
