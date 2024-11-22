import { useCallback } from 'react';
import { captureError } from '../services/errorMonitoring';
import toast from 'react-hot-toast';

export const useErrorHandler = () => {
  const handleError = useCallback((error, context = {}) => {
    const errorMessage = captureError(error, context);
    toast.error(errorMessage);
  }, []);

  return { handleError };
};