import React from 'react';

// Styles
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface PopupErrorAlert {
  isOpen: boolean;
  message?: string;
  handleClose: () => void;
}

const PopupErrorAlert = ({ handleClose, isOpen, message }: PopupErrorAlert) => (
  <Dialog
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title"> Oh no...</DialogTitle>
    <DialogContent>{message}</DialogContent>
    <DialogActions>
      <Button onClick={handleClose} data-testid={'ok-popup'}>
        OK
      </Button>
    </DialogActions>
  </Dialog>
);
export default PopupErrorAlert;
