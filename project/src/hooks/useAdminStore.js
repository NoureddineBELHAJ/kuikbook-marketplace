import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

const useAdminStore = create(
  persist(
    (set, get) => ({
      stats: {
        totalUsers: 1234,
        activeBookings: 856,
        totalReviews: 432,
        totalRevenue: 45678,
        recentActivity: [
          {
            type: 'user',
            action: 'New user registration',
            time: '5m ago',
            details: 'John Smith (Traveler)'
          },
          {
            type: 'booking',
            action: 'Booking confirmed',
            time: '10m ago',
            details: 'Desert Safari Adventure'
          },
          {
            type: 'review',
            action: 'New review submitted',
            time: '15m ago',
            details: 'City Walking Tour'
          }
        ]
      },

      users: [],
      activities: [],
      bookings: [],
      isLoading: false,
      error: null,

      fetchUsers: async () => {
        try {
          set({ isLoading: true });
          // Mock data for development
          const mockUsers = [
            { 
              id: 1, 
              name: 'John Smith', 
              email: 'john@example.com', 
              role: 'TRAVELER',
              status: 'Active',
              createdAt: new Date().toISOString()
            },
            { 
              id: 2, 
              name: 'Adventure Tours', 
              email: 'provider@example.com', 
              role: 'PROVIDER',
              status: 'Active',
              createdAt: new Date().toISOString()
            }
          ];
          set({ users: mockUsers });
          return mockUsers;
        } catch (error) {
          console.error('Error fetching users:', error);
          toast.error('Failed to fetch users');
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      fetchActivities: async () => {
        try {
          set({ isLoading: true });
          const mockActivities = [
            {
              id: 1,
              title: 'Desert Safari Adventure',
              provider: 'Adventure Tours LLC',
              price: 99,
              status: 'Active',
              bookings: 45
            },
            {
              id: 2,
              title: 'City Walking Tour',
              provider: 'Local Guides Co.',
              price: 29,
              status: 'Active',
              bookings: 32
            }
          ];
          set({ activities: mockActivities });
          return mockActivities;
        } catch (error) {
          console.error('Error fetching activities:', error);
          toast.error('Failed to fetch activities');
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      fetchBookings: async () => {
        try {
          set({ isLoading: true });
          const mockBookings = [
            {
              id: 1,
              activity: 'Desert Safari Adventure',
              customer: 'John Smith',
              date: '2023-12-15',
              status: 'Confirmed',
              amount: 99
            },
            {
              id: 2,
              activity: 'City Walking Tour',
              customer: 'Jane Doe',
              date: '2023-12-16',
              status: 'Pending',
              amount: 29
            }
          ];
          set({ bookings: mockBookings });
          return mockBookings;
        } catch (error) {
          console.error('Error fetching bookings:', error);
          toast.error('Failed to fetch bookings');
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      initialize: async () => {
        try {
          set({ isLoading: true });
          await Promise.all([
            get().fetchUsers(),
            get().fetchActivities(),
            get().fetchBookings()
          ]);
        } catch (error) {
          console.error('Error initializing admin data:', error);
          toast.error('Failed to initialize admin data');
          throw error;
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'admin-storage',
      partialize: (state) => ({
        stats: state.stats
      })
    }
  )
);

export const useAdmin = () => useAdminStore();