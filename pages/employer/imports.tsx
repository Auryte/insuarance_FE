import React, { ReactElement, useContext, useState } from 'react';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';

// Components
import Layout from '@/components/shared/EmployerNavLayout/Layout';
import FileUploadInput from '@/components/shared/FileUploadInput/FileUploadInput';
import PopupErrorAlert from '@/components/shared/PopupErrorAlert/PopupErrorAlert';

// Styles
import { formBoxWrapper, StyledAlert } from '@/styles/styled';
import { Box, Divider, Typography } from '@mui/material';
import { theme } from '@/styles/theme';

// Api
import { uploadCsvData } from '../api/fileUploadApi';

// Contexts
import { AuthContext } from '@/contexts/AuthContext';
import { LogoUrlProvider } from '@/contexts/LogoUrlContext';

// Types
import { ErrorProps, ErrorsProps } from '@/components/shared/FileUploadInput/FileUploadInput.types';

const Imports = () => {
  const [newFile, setNewFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const [isFileSubmitting, setIsFileSubmitting] = useState<boolean>(false);
  const { getUser } = useContext(AuthContext);
  const user = getUser();
  const [responseErrors, setResponseErrors] = useState<ErrorsProps | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const isFile = Boolean(fileUrl) && !(newFile.length > 0);

  const handleSetErrors = (errors: ErrorsProps | null) => {
    setResponseErrors(errors);
  };
  const handleDialogClose = (): void => setOpenDialog(false);
  const handleDialogOpen = (): void => setOpenDialog(true);

  const generateErrors = (errors: ErrorProps[]) =>
    errors.map(error =>
      error.fields.map(field => (
        <Box key={uuidv4()}>
          <Typography sx={{ mx: 1, fontSize: '0.7rem' }}>
            Field name:{' '}
            <Box component="span" fontWeight="bold">
              {field.name}.
            </Box>{' '}
            Field message:{' '}
            <Box component="span" fontWeight="bold">
              {field.message}
            </Box>
          </Typography>
        </Box>
      )),
    );

  return (
    <>
      <Head>
        <title>Employer imports</title>
        <meta name="description" content="Employer imports page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{ ...formBoxWrapper, display: 'block', m: 1, minHeight: '55vh', height: 'fitContent' }}
        component="form"
        noValidate
      >
        <FileUploadInput
          name="file"
          accept="text/csv"
          supportedFiles="CSV"
          errorMessage="File must be .csv format."
          uploadCallback={uploadCsvData}
          setNewFile={setNewFile}
          isfile={isFile}
          setIsFileUploading={setIsFileUploading}
          isFileSubmitting={isFileSubmitting}
          employerId={user?.employerID}
          handleSetErrors={handleSetErrors}
          isFileUploading={isFileUploading}
          handleOpen={handleDialogOpen}
        />
        <Box sx={{ mt: 3 }}>
          {responseErrors && (
            <>
              <StyledAlert severity="error" variant="outlined">
                Found errors in the document.
                <Divider sx={{ my: 1, background: theme.palette.error.dark }} />
                {responseErrors.mongoDBErrors && generateErrors(responseErrors.mongoDBErrors)}
                {responseErrors.validationErrors && generateErrors(responseErrors.validationErrors)}
              </StyledAlert>
            </>
          )}
        </Box>
        <PopupErrorAlert
          handleClose={handleDialogClose}
          isOpen={openDialog}
          message="Looks like the file data does not match the required data. Please try to upload another file."
        />
      </Box>
    </>
  );
};

Imports.getLayout = function getLayout(page: ReactElement) {
  return (
    <LogoUrlProvider>
      <Layout>{page}</Layout>
    </LogoUrlProvider>
  );
};

export default Imports;
