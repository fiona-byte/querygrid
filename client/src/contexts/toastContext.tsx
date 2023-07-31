import {
  createContext,
  ReactNode,
  useCallback,
  useState,
  forwardRef,
  SyntheticEvent,
} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

type ToastProps = {
  children?: ReactNode;
};

type Toast = {
  message: string;
  type: 'success' | 'error' | 'warning';
  duration?: number;
  show?: boolean;
};

type ToastContext = {
  triggerToast: (_toast: Toast) => void;
};

export const ToastContext = createContext<ToastContext>({
  triggerToast: (_toast: Toast) => null,
});

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ToastProvider = ({ children }: ToastProps) => {
  const [toaster, setToaster] = useState<Toast>({
    show: false,
    message: '',
    type: 'success',
  });

  const triggerToast = useCallback(
    (toast: Toast) => {
      setToaster({ ...toast, show: true });
    },
    [toaster]
  );

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setToaster({ ...toaster, show: false });
  };

  return (
    <ToastContext.Provider value={{ triggerToast }}>
      <Snackbar
        open={toaster.show}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={toaster?.duration || 5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={toaster.type}
          sx={{ width: '100%' }}
        >
          {toaster.message}
        </Alert>
      </Snackbar>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
