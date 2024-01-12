import React, {
  FC,
  SyntheticEvent,
  Fragment,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react';
import Image from 'next/image';
import { AxiosError } from 'axios';

// Contexts
import { useSnackbar } from '@/contexts/SnackbarContext';

// Hooks
import useErrorHandler from '@/hooks/useErrorHandler';

// Styles
import { Stack, Typography, Box } from '@mui/material';
import { theme } from '@/styles/theme';
import * as S from './FileUploadInput.styles';

// Assets
import uploadImg from '@/assets/upload.png';

// Utils
import {
  FileUploadType,
  FileUploadImageConfig,
  checkIsFileTypeValid,
  calcFileSize,
  checkIfFileDataMatches,
  csvToArray,
} from './FileUploadInput.utils';

// Types
import { SnackbarType } from '@/types/snackbar';
import { FileUploadInputProps } from './FileUploadInput.types';

const FileUploadInput: FC<FileUploadInputProps> = ({
  name,
  accept,
  supportedFiles,
  errorMessage,
  uploadCallback,
  setNewFile,
  setFileUrl,
  isfile,
  setIsFileUploading,
  isFileSubmitting,
  employerId,
  handleSetErrors,
  isFileUploading,
  handleOpen,
}) => {
  const [singleFile, setSingleFile] = useState<File[]>([]);
  const [isFileValid, setIsFileValid] = useState<boolean>(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleErrors } = useErrorHandler();
  const { open: snackbarOpen, showSnackbar } = useSnackbar();

  const handleDragEnter = () => wrapperRef.current?.classList.add('dragover');

  const handleDragLeave = () => wrapperRef.current?.classList.remove('dragover');

  const handleFileUpload = useCallback(
    async (file: File): Promise<void> => {
      try {
        if (accept === 'text/csv') {
          setIsFileUploading(true);
          handleSetErrors?.(null);
          const parsedData = await csvToArray(file);
          if (!checkIfFileDataMatches(parsedData)) {
            handleOpen?.();
            setIsFileUploading(false);
            setIsFileValid(false);
          } else {
            await uploadCallback(parsedData, employerId);
            setIsFileUploading(false);
            showSnackbar('Users added successfully to database', SnackbarType.success);
            setIsFileValid(false);
          }
        } else {
          setIsFileUploading(true);
          const { message, data } = await uploadCallback(file);
          setFileUrl?.(data);
          setIsFileUploading(false);
          showSnackbar(message, SnackbarType.success);
        }
      } catch (error) {
        setIsFileUploading(false);
        if (error instanceof AxiosError) {
          if (accept === 'text/csv') {
            error.response?.status !== 400 && handleErrors(error);
            (error.response?.data.mongoDBErrors || error.response?.data.validationErrors) &&
              handleSetErrors?.(error.response?.data);
          } else {
            handleErrors(error);
          }
        }
      }
    },
    [uploadCallback, setFileUrl, setIsFileUploading, showSnackbar],
  );

  const handleFileDrop = useCallback(
    (e: SyntheticEvent<EventTarget>) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;

      const newFile = Object.values(target.files).filter(item => item instanceof File);
      setSingleFile(newFile);

      if (!checkIsFileTypeValid(newFile[0], accept)) {
        showSnackbar(errorMessage, SnackbarType.error);
        setIsFileValid(false);
      } else {
        handleFileUpload(newFile[0]);
      }
    },
    [accept, errorMessage, showSnackbar, handleFileUpload],
  );

  useEffect(() => {
    setNewFile(singleFile);
  }, [setNewFile, singleFile]);

  useEffect(() => {
    if (isFileSubmitting) {
      setSingleFile([]);
    }
  }, [isFileSubmitting]);

  useEffect(() => {
    if (!isFileValid && !snackbarOpen && inputRef.current) {
      setSingleFile([]);
      setIsFileValid(true);
      inputRef.current.value = '';
    }
  }, [isFileValid, snackbarOpen]);

  return (
    <>
      <S.FileUploadInputWrapper
        ref={wrapperRef}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDragLeave}
        isfile={isfile.toString()}
      >
        {singleFile.length > 0 ? (
          <Stack sx={{ px: '15%', width: '100%' }}>
            {singleFile.map((item, index) => {
              const fileType = item.type.split('/')[1].split('+')[0] as FileUploadType;
              return (
                <Fragment key={index}>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <S.FileUploadImage
                      src={FileUploadImageConfig[`${fileType}`] || FileUploadImageConfig['default']}
                      alt="File to be uploaded"
                    />
                    <Box sx={{ ml: 1 }}>
                      <Typography data-testid="file-name">{item.name}</Typography>
                      <Typography variant="body2" data-testid="file-size">
                        {calcFileSize(item.size)}
                      </Typography>
                    </Box>
                  </Box>
                </Fragment>
              );
            })}
          </Stack>
        ) : (
          <Stack justifyContent="center" sx={{ p: 1, textAlign: 'center' }}>
            <Typography sx={{ color: theme.palette.common.grey }}>Browse file to upload</Typography>
            <div>
              <Image src={uploadImg} alt="File upload" height={80} />
            </div>
            <Typography variant="body1" component="span">
              <strong>Supported Files</strong>
            </Typography>
            <Typography variant="body2" component="span">
              {supportedFiles}
            </Typography>
          </Stack>
        )}
        <S.FileUploadInput
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          onChange={handleFileDrop}
          data-testid="file-upload"
          disabled={snackbarOpen || isFileUploading}
          sx={Boolean(snackbarOpen || isFileUploading) ? { cursor: 'wait' } : { cursor: 'pointer' }}
        />
      </S.FileUploadInputWrapper>
    </>
  );
};

export default FileUploadInput;
