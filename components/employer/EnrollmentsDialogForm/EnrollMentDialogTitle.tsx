import React from 'react';

// Styles
import { DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const EnrollMentDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, minWidth: '480px' }}>
      {children}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

export default EnrollMentDialogTitle;
