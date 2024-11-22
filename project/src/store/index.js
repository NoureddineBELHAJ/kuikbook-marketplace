// Using Zustand instead of Redux
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      user: null,
      activities: [],
      bookings: [],
      setUser: (user) => set({ user }),
      setActivities: (activities) => set({ activities }),
      setBookings: (bookings) => set({ bookings }),
      logout: () => set({ user: null, bookings: [] })
    }),
    {
      name: 'marketplace-storage'
    }
  )
);

export default useStore;