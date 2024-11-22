import { useState } from 'react';
import activitiesApi from '../services/api/activities';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

export function useActivities() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProviderActivities = async (providerId) => {
    if (!providerId) return [];
    setIsLoading(true);
    try {
      const data = await activitiesApi.getAll({ providerId });
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch activities');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createActivity = async (activityData) => {
    if (!user?.id) throw new Error('Unauthorized');
    setIsLoading(true);
    try {
      const data = await activitiesApi.create({
        ...activityData,
        providerId: user.id
      });
      toast.success('Activity created successfully');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to create activity');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateActivity = async (id, updates) => {
    if (!user?.id) throw new Error('Unauthorized');
    setIsLoading(true);
    try {
      const data = await activitiesApi.update(id, updates);
      toast.success('Activity updated successfully');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to update activity');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteActivity = async (id) => {
    if (!user?.id) throw new Error('Unauthorized');
    setIsLoading(true);
    try {
      await activitiesApi.delete(id);
      toast.success('Activity deleted successfully');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to delete activity');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateAvailability = async (id, availabilityData) => {
    if (!user?.id) throw new Error('Unauthorized');
    setIsLoading(true);
    try {
      const data = await activitiesApi.updateAvailability(id, availabilityData);
      toast.success('Availability updated successfully');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to update availability');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePricing = async (id, pricingData) => {
    if (!user?.id) throw new Error('Unauthorized');
    setIsLoading(true);
    try {
      const data = await activitiesApi.updatePricing(id, pricingData);
      toast.success('Pricing updated successfully');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to update pricing');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getProviderActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    updateAvailability,
    updatePricing
  };
}