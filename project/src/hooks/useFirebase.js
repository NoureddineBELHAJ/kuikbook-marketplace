import { useState, useCallback } from 'react';
import * as firebase from '../services/firebase';

export const useFirebase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOperation = useCallback(async (operation, ...args) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await operation(...args);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback((email, password) => 
    handleOperation(firebase.signIn, email, password), [handleOperation]);

  const signUp = useCallback((email, password, userData) => 
    handleOperation(firebase.signUp, email, password, userData), [handleOperation]);

  const uploadImage = useCallback((uri, path) => 
    handleOperation(firebase.uploadImage, uri, path), [handleOperation]);

  const createActivity = useCallback((activityData) => 
    handleOperation(firebase.createActivity, activityData), [handleOperation]);

  const getActivities = useCallback(() => 
    handleOperation(firebase.getActivities), [handleOperation]);

  const createBooking = useCallback((bookingData) => 
    handleOperation(firebase.createBooking, bookingData), [handleOperation]);

  return {
    isLoading,
    error,
    signIn,
    signUp,
    uploadImage,
    createActivity,
    getActivities,
    createBooking
  };
};