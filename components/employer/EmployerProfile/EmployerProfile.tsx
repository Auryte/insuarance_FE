import React, { FC, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';

// Components
import { EmployerFormInputs } from '@/components/admin/EmployerTab/AddUpdateEmployer/AddUpdateEmployer';
import { PopupAlert } from '@/components/shared/PopupAlert/PopupAlert';
import FormInput from '@/components/shared/FormInput/FormInput';
import FileUploadInput from '@/components/shared/FileUploadInput/FileUploadInput';

// Styles
import { boxStyles, boxStylesAlternative, formBoxWrapper, gridBoxWrapper } from '@/styles/styled';
import {
  EmployerLogoWrapper,
  EmployerLogo,
  EmployerLogoEdit,
} from '@/components/admin/EmployerTab/AddUpdateEmployer/AddUpdateEmployer.styles';

// Types
import { Employer } from '@/types/employer';
import { SnackbarType } from '@/types/snackbar';

// Utils
import { employerValidationSchema } from '@/components/admin/EmployerTab/AddUpdateEmployer/AddUpdateEmployer.utils';

// Api
import { uploadImage } from '@/pages/api/fileUploadApi';
import { updateEmployer } from '@/pages/api/employerApi';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

// Context
import { useSnackbar } from '@/contexts/SnackbarContext';
import { LogoUrlContext } from '@/contexts/LogoUrlContext';

interface Props {
  employer: Employer | undefined;
  setEmployer: (employer: Employer | undefined) => void;
}

const EmployerProfile: FC<Props> = ({ employer, setEmployer }: Props) => {
  const { handleSubmit, reset, control, setError, formState } = useForm<EmployerFormInputs>({
    resolver: yupResolver(employerValidationSchema),
  });

  const [welcomeTitle, setWelcomeTitle] = useState<string>('Welcome');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [newLogo, setNewLogo] = useState<File[]>([]);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const [isLogoUploading, setIsLogoUploading] = useState<boolean>(false);
  const [isLogoSubmitting, setIsLogoSubmitting] = useState<boolean>(false);
  const { open: snackbarOpen, showSnackbar } = useSnackbar();
  const { handleErrors } = useErrorHandler();
  const { setImageUrl } = useContext(LogoUrlContext);

  const fillFormWithCurrentEmployerData = () => {
    reset({
      name: employer?.name,
      code: employer?.code,
      street: employer?.street,
      city: employer?.city,
      state: employer?.state,
      zipCode: employer?.zipCode,
      phone: employer?.phone,
    });
  };

  useEffect(() => {
    employer && fillFormWithCurrentEmployerData();
    if (employer) {
      setWelcomeTitle(`Welcome ${employer.name}`);
    }
  }, [employer]);

  const handleCancelClick = () => {
    setIsPopupOpen(true);
  };

  const onCancelConfirmHandler = () => {
    setIsPopupOpen(false);
    fillFormWithCurrentEmployerData();
  };

  const isLogo = (Boolean(logoUrl) || Boolean(employer?.logo)) && !(newLogo.length > 0);

  const handleSubmitForm = async (data: EmployerFormInputs): Promise<void> => {
    setIsLogoSubmitting(true);
    try {
      if (employer) {
        const updatedEmployer = await updateEmployer(employer.id, { ...data, logo: logoUrl });
        showSnackbar('Successfully updated.', SnackbarType.success);
        setEmployer(updatedEmployer);
        if (updatedEmployer?.logo) {
          setImageUrl(updatedEmployer.logo);
        }
        fillFormWithCurrentEmployerData();
        setLogoUrl(undefined);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        handleErrors(error, setError, formState);
      }
    }
  };

  const formInputs = formState.defaultValues && Object.keys(formState.defaultValues);

  return (
    <Box sx={{ ...gridBoxWrapper, px: 1, pt: 5 }}>
      <Typography variant="h6">
        {employer && <div data-testid="welcome">{welcomeTitle}</div>}
      </Typography>
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
            {formInputs?.map((formInput, index) => {
              const type = 'text';
              let required = true;
              if (formInput === 'zipCode' || formInput === 'state') {
                required = false;
              }
              return (
                <FormInput
                  key={index}
                  control={control}
                  name={formInput}
                  required={required}
                  type={type}
                />
              );
            })}
          </Grid>
        </Box>
        <Box
          sx={{
            ...boxStylesAlternative,
            display: 'block',
            '&::before': { ...boxStyles['&::before'], content: `"Logo"` },
          }}
        >
          <EmployerLogoWrapper data-testid="logo-wrapper">
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
                  data-testid="logo"
                  priority={true}
                />
                <EmployerLogoEdit>
                  <EditIcon />
                </EmployerLogoEdit>
              </>
            ) : null}
          </EmployerLogoWrapper>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'right', mt: 5 }}>
          <Button variant="contained" size="medium" onClick={handleCancelClick}>
            Cancel
          </Button>
          {isPopupOpen && (
            <PopupAlert
              isOpen={true}
              message={'Do you want to discard any changes?'}
              handleConfirm={onCancelConfirmHandler}
              handleClose={() => setIsPopupOpen(false)}
            />
          )}
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

export default EmployerProfile;
