import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

export const EmployerLogoEdit = styled(Button)({
  position: 'absolute',
  top: '64px',
  right: '18px',
  padding: '12px',
  minWidth: '0',
  color: 'rgba(0, 0, 0, 0.54)',
  backgroundColor: 'rgba(0, 0, 0, 0.04)',
  borderRadius: '50%',
  userSelect: 'none',
  pointerEvents: 'none',
  opacity: 0,
});

export const EmployerLogoWrapper = styled('div')({
  position: 'relative',
  margin: '32px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover > button': {
    opacity: 1,
    transition: 'opacity 0.15s ease',
  },
});

export const EmployerLogo = styled(Image)({
  position: 'absolute',
  bottom: '0',
  width: 'auto',
  height: '100%',
  maxHeight: '208px',
  maxWidth: '100%',
  borderRadius: '4px',
  objectFit: 'contain',
  userSelect: 'none',
  pointerEvents: 'none',
});
