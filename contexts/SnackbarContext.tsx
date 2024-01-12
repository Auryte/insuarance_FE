import React, { ReactNode, FC, createContext, useContext, useState } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

const snackbarAutoHideDelayMsFallback = 6000;
const snackbarAutoHideDelayMs: number =
  (process.env.NEXT_PUBLIC_SNACK_BAR_AUTO_HIDE_DELAY &&
    Number.parseInt(process.env.NEXT_PUBLIC_SNACK_BAR_AUTO_HIDE_DELAY, 10)) ||
  snackbarAutoHideDelayMsFallback;

interface SnackbarContextProviderProps {
  children: ReactNode;
}

interface ISnackbarContext {
  open: boolean;
  showSnackbar: (text: string, typeColor: AlertColor) => void;
}

const initialValue: ISnackbarContext = {
  open: false,
  showSnackbar: () => {},
};

const SnackbarContext = createContext<ISnackbarContext>(initialValue);

const SnackbarProvider: FC<SnackbarContextProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [typeColor, setTypeColor] = useState<AlertColor>('info');

  const showSnackbar = (text: string, color: AlertColor) => {
    setMessage(text);
    setTypeColor(color);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ open, showSnackbar }}>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={snackbarAutoHideDelayMs}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={typeColor}
          sx={{
            '& .MuiAlert-icon': {
              color: 'white',
            },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

const useSnackbar = (): ISnackbarContext => {
  const context = useContext(SnackbarContext);
  return context;
};

export { SnackbarProvider, useSnackbar };
