import { useEffect, useState } from 'react';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './useAuth';

export function useRealTimeActivity(activityId) {
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!activityId) return;

    setIsLoading(true);
    const activityRef = doc(db, 'activities', activityId);

    const unsubscribe = onSnapshot(
      activityRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setActivity({
            id: doc.id,
            ...data,
            isAvailable: data.maxParticipants > data.currentBookings,
            availableSlots: data.maxParticipants - data.currentBookings,
            lastUpdated: new Date(doc.updateTime.toMillis())
          });
        } else {
          setError('Activity not found');
        }
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching activity:', error);
        setError(error.message);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [activityId]);

  const updateAvailability = async (updates) => {
    if (!activityId || !user) return;

    try {
      const activityRef = doc(db, 'activities', activityId);
      await updateDoc(activityRef, {
        ...updates,
        updatedAt: serverTimestamp(),
        updatedBy: user.id
      });
    } catch (error) {
      console.error('Error updating availability:', error);
      throw error;
    }
  };

  return {
    activity,
    isLoading,
    error,
    updateAvailability
  };
}