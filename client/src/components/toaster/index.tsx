import { useState, forwardRef, SyntheticEvent, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

type ToasterProps = {
  show: boolean;
  message: string;
  type: 'success' | 'error';
  duration?: number;
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toaster = ({ show, duration, message, type }: ToasterProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;

    setOpen(false);
  };

  useEffect(() => {
    if (show) setOpen(true);
  }, [show]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={duration || 5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
