import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { ReactNode } from 'react';

interface PopupAlert {
  isOpen: boolean;
  message: string;
  handleConfirm: () => void;
  handleClose: () => void;
}

export const PopupAlert = ({ handleClose, handleConfirm, isOpen, message }: PopupAlert) => (
  <Dialog
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
    <DialogContent>{message}</DialogContent>
    <DialogActions>
      <Button onClick={handleClose} data-testid={'cancel-popup'}>
        Cancel
      </Button>
      <Button onClick={handleConfirm} autoFocus data-testid={'submit-popup'}>
        Continue
      </Button>
    </DialogActions>
  </Dialog>
);
