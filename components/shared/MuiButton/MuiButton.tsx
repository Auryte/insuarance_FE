import { FC } from 'react';
import { Button } from '@mui/material';
import { ButtonProps } from '@mui/material';

// type MuiButtonProps = ButtonProps<ButtonType, {}>; //you can add your additional custom props if yu need. use interface with props instead of {}

const MuiButton: FC<ButtonProps> = ({
  children,
  variant = 'contained',
  size = 'medium',
  sx = { width: '150px' },
  ...props
}) => (
  <Button variant={variant} size={size} sx={sx} {...props}>
    {children}
  </Button>
);

export default MuiButton;
