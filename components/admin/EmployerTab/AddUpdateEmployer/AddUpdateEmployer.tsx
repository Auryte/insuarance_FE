import React, { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { AxiosError } from 'axios';

// Contexts
import ViewsContext from '@/contexts/AdminViewsContext';
import EmployerContext, { EmployerContextData } from '@/contexts/EmployerContext';
import { useSnackbar } from '@/contexts/SnackbarContext';

// Types
import { MainViews } from '@/types/adminTypes';
import { Employer } from '@/types/employer';
import { SnackbarType } from '@/types/snackbar';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

// Components
import EmployerTabTitle from '../EmployerTabTitle/EmployerTabTitle';
import FormInput from '@/components/shared/FormInput/FormInput';
import FileUploadInput from '@/components/shared/FileUploadInput/FileUploadInput';

// Api
import { createEmployer, updateEmployer } from '@/pages/api/employerApi';
import { uploadImage } from '@/pages/api/fileUploadApi';

// Utils
import { employerValidationSchema } from '@/components/admin/EmployerTab/AddUpdateEmployer/AddUpdateEmployer.utils';
import { sleep } from '@/utils/helpers';
import { timeout } from '@/utils/timeout';

// Styles
import { boxStyles, boxStylesAlternative, formBoxWrapper, gridBoxWrapper } from '@/styles/styled';
import { EmployerLogoWrapper, EmployerLogo, EmployerLogoEdit } from './AddUpdateEmployer.styles';

export type EmployerFormInputs = {
  name: string;
  code: string;
  street: string;
  city: string;
  state?: string;
  zipCode?: string;
  phone: string;
  logo?: string;
};

const AddUpdateEmployer: FC = () => {
  const { setViewName } = useContext(ViewsContext);
  const { employer, saveEmployer } = useContext<EmployerContextData>(EmployerContext);
  const { handleSubmit, reset, control, formState, setError } = useForm<EmployerFormInputs>({
    defaultValues: {
      name: employer ? employer.name : '',
      code: employer ? employer.code : '',
      street: employer ? employer.street : '',
      city: employer ? employer.city : '',
      state: employer ? employer.state : '',
      zipCode: employer ? employer.zipCode : '',
      phone: employer ? employer.phone : '',
    },
    resolver: yupResolver(employerValidationSchema),
  });
  const [newLogo, setNewLogo] = useState<File[]>([]);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const [isLogoUploading, setIsLogoUploading] = useState<boolean>(false);
  const [isLogoSubmitting, setIsLogoSubmitting] = useState<boolean>(false);

  const { handleErrors } = useErrorHandler();
  const { open: snackbarOpen, showSnackbar } = useSnackbar();

  const resetForm = async (empl?: Employer): Promise<void> => {
    await sleep(timeout);
    reset();
    setViewName(MainViews.administration);
    saveEmployer(empl);
    setLogoUrl(undefined);
  };

  const handleSubmitForm = async (data: EmployerFormInputs): Promise<void> => {
    setIsLogoSubmitting(true);
    try {
      if (!employer) {
        const newEmployer = await createEmployer({ ...data, logo: logoUrl });
        showSnackbar('Successfully created.', SnackbarType.success);
        await resetForm(newEmployer);
      } else {
        const updatedEmployer = await updateEmployer(employer.id, { ...data, logo: logoUrl });
        showSnackbar('Successfully updated.', SnackbarType.success);
        await resetForm(updatedEmployer);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        handleErrors(error, setError, formState);
      }
    }
  };

  const handleCancelClick = () => {
    !employer ? setViewName(MainViews.employerSearch) : setViewName(MainViews.administration);
  };

  const isLogo = (Boolean(logoUrl) || Boolean(employer?.logo)) && !(newLogo.length > 0);

  const formInputs = formState.defaultValues && Object.keys(formState.defaultValues);

  const getFormInputs = () =>
    formInputs?.map((formInput, index) => {
      let required = true;
      let placeholder = '';
      if (formInput === 'name') placeholder = "e.g. 'BY - isssoft'";
      if (formInput === 'code') placeholder = "e.g. 'BY'";
      if (formInput === 'state' || formInput === 'zipCode') required = false;

      return (
        <FormInput
          key={index}
          control={control}
          name={formInput}
          required={required}
          type="text"
          placeholder={placeholder}
        />
      );
    });

  return (
    <Box sx={gridBoxWrapper}>
      {employer ? <EmployerTabTitle /> : null}
      <Box
        sx={{
          ...boxStylesAlternative,
          display: 'block',
          '&::before': { ...boxStyles['&::before'], content: `"Logo"` },
        }}
      >
        <EmployerLogoWrapper>
          <FileUploadInput
            name="image"
            accept="image/jpg, image/jpeg, image/png, image/svg+xml, image/webp"
            supportedFiles="JPG, JPEG, PNG, SVG, WEBP"
            errorMessage="Logo must be an image of jpeg, jpg, png, svg or webp format."
            uploadCallback={uploadImage}
            setNewFile={setNewLogo}
            setFileUrl={setLogoUrl}
            isfile={isLogo}
            setIsFileUploading={setIsLogoUploading}
            isFileSubmitting={isLogoSubmitting}
          />
          {isLogo ? (
            <>
              <EmployerLogo
                src={logoUrl || (employer?.logo as string)}
                alt="Employer logo"
                width={900}
                height={300}
              />
              <EmployerLogoEdit>
                <EditIcon />
              </EmployerLogoEdit>
            </>
          ) : null}
        </EmployerLogoWrapper>
      </Box>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleSubmitForm)}
        sx={formBoxWrapper}
      >
        <Box
          sx={{
            ...boxStylesAlternative,
            '&::before': { ...boxStyles['&::before'], content: `"Profile"` },
          }}
        >
          <Grid container spacing={3}>
            {getFormInputs()}
          </Grid>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'right', mt: 5 }}>
          <Button variant="contained" size="medium" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button
            disabled={snackbarOpen || isLogoUploading}
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

export default AddUpdateEmployer;
