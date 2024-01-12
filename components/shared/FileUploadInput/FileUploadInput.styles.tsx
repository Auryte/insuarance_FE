import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

interface FileUploadInputWrapperProps {
  isfile: string;
}

export const FileUploadInputWrapper = styled(Box)<FileUploadInputWrapperProps>(
  ({ theme, isfile }) => ({
    '&.MuiBox-root:hover, &.MuiBox-root.dragover': {
      opacity: isfile === 'true' ? 0 : 0.6,
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: '208px',
    border: `2px dashed ${theme.palette.common.grey}`,
    borderRadius: '4px',
    opacity: isfile === 'true' ? 0 : 1,
  }),
);

export const FileUploadInput = styled('input')({
  opacity: 0,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
});

export const FileUploadImage = styled(Image)({
  flexBasis: 'max-content',
  height: '56px',
  objectFit: 'contain',
});
