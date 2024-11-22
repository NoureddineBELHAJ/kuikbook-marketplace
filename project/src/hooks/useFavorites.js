import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (activityId) => {
        const { user } = useAuth.getState();
        if (!user) {
          toast.error('Please log in to save favorites');
          return;
        }

        set(state => {
          const isFavorite = state.favorites.includes(activityId);
          const newFavorites = isFavorite
            ? state.favorites.filter(id => id !== activityId)
            : [...state.favorites, activityId];

          toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
          return { favorites: newFavorites };
        });
      },

      isFavorite: (activityId) => {
        return get().favorites.includes(activityId);
      },

      getFavorites: () => {
        return get().favorites;
      },

      clearFavorites: () => {
        set({ favorites: [] });
      }
    }),
    {
      name: 'favorites-storage'
    }
  )
);

export const useFavorites = () => useFavoritesStore();