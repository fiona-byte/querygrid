import { useContext } from 'react';
import { ToastContext } from '@context/toastContext';

export const useToaster = () => useContext(ToastContext);
