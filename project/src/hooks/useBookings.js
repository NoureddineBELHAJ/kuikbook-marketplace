import { useState } from 'react';
import bookingsApi from '../services/api/bookings';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

export function useBookings() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBooking = async (bookingData) => {
    if (!user?.id) throw new Error('Please log in to make a booking');
    setIsLoading(true);
    try {
      const data = await bookingsApi.create({
        ...bookingData,
        userId: user.id
      });
      toast.success('Booking created successfully');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to create booking');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getTravelerBookings = async (userId) => {
    if (!userId) return [];
    setIsLoading(true);
    try {
      const data = await bookingsApi.getByUser(userId);
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch bookings');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getProviderBookings = async (providerId) => {
    if (!providerId) return [];
    setIsLoading(true);
    try {
      const data = await bookingsApi.getByProvider(providerId);
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch bookings');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    if (!user?.id) throw new Error('Unauthorized');
    setIsLoading(true);
    try {
      const data = await bookingsApi.updateStatus(bookingId, status);
      toast.success('Booking status updated');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to update booking status');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelBooking = async (bookingId, reason) => {
    if (!user?.id) throw new Error('Unauthorized');
    setIsLoading(true);
    try {
      const data = await bookingsApi.cancel(bookingId, reason);
      toast.success('Booking cancelled successfully');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to cancel booking');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createBooking,
    getTravelerBookings,
    getProviderBookings,
    updateBookingStatus,
    cancelBooking
  };
}