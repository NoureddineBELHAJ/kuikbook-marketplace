import { useState } from 'react';
import paymentsApi from '../services/api/payments';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

export function usePayments() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPaymentIntent = async (bookingData) => {
    if (!user?.id) throw new Error('Please log in to make a payment');
    setIsLoading(true);
    try {
      const data = await paymentsApi.createPaymentIntent(bookingData);
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Payment processing failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getProviderBalance = async (providerId) => {
    if (!providerId) throw new Error('Provider ID required');
    setIsLoading(true);
    try {
      const data = await paymentsApi.getProviderBalance(providerId);
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch balance');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const requestPayout = async (amount) => {
    if (!user?.id) throw new Error('Unauthorized');
    setIsLoading(true);
    try {
      const data = await paymentsApi.requestPayout(user.id, amount);
      toast.success('Payout request submitted');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to request payout');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getTransactionHistory = async (params) => {
    if (!user?.id) throw new Error('Unauthorized');
    setIsLoading(true);
    try {
      const data = await paymentsApi.getTransactionHistory(user.id, params);
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch transactions');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getPayoutHistory = async (params) => {
    if (!user?.id) throw new Error('Unauthorized');
    setIsLoading(true);
    try {
      const data = await paymentsApi.getPayoutHistory(user.id, params);
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch payout history');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createPaymentIntent,
    getProviderBalance,
    requestPayout,
    getTransactionHistory,
    getPayoutHistory
  };
}