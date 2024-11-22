import { create } from 'zustand';
import { getStorageItem, setStorageItem } from '../utils/localStorage';
import { useBookings } from './useBookings';
import { useReviews } from './useReviews';

const STORAGE_KEY = 'kuikbook_traveler';

const useTravelerStore = create((set, get) => ({
  recentlyViewed: getStorageItem(STORAGE_KEY, {
    activities: []
  }),

  addToRecentlyViewed: (activity) => {
    set((state) => {
      const activities = state.recentlyViewed.activities.filter(a => a.id !== activity.id);
      activities.unshift(activity);
      
      const updatedRecentlyViewed = {
        activities: activities.slice(0, 5) // Keep only last 5 viewed
      };
      
      setStorageItem(STORAGE_KEY, updatedRecentlyViewed);
      return { recentlyViewed: updatedRecentlyViewed };
    });
  },

  getStats: (travelerId) => {
    const { getActiveBookings } = useBookings();
    const { getTravelerReviews } = useReviews();
    
    const activeBookings = getActiveBookings(travelerId);
    const reviews = getTravelerReviews(travelerId);
    const placesVisited = new Set(reviews.map(r => r.location)).size;
    const favorites = getStorageItem('kuikbook_favorites', []).length;

    return {
      upcomingTrips: activeBookings.length,
      placesVisited,
      reviewsGiven: reviews.length,
      favorites
    };
  },

  getRecentlyViewed: () => {
    const state = get();
    return state.recentlyViewed.activities;
  }
}));

export const useTraveler = () => {
  const store = useTravelerStore();
  return {
    ...store,
  };
};