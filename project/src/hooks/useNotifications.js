import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

const useNotificationsStore = create((set, get) => ({
  notifications: [],
  preferences: {
    email: true,
    sms: false,
    push: true
  },
  isLoading: false,
  error: null,

  // Get user notifications
  getNotifications: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.get('/notifications');
      set({ notifications: data.notifications });
      return data.notifications;
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  // Update notification preferences
  updatePreferences: async (preferences) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.patch('/notifications/preferences', preferences);
      set({ preferences: data.preferences });
      toast.success('Notification preferences updated');
      return data.preferences;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message });
      toast.error(`Failed to update preferences: ${message}`);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
      
      set(state => ({
        notifications: state.notifications.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      }));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    try {
      await api.delete(`/notifications/${notificationId}`);
      
      set(state => ({
        notifications: state.notifications.filter(
          notif => notif.id !== notificationId
        )
      }));
      
      toast.success('Notification deleted');
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  }
}));

export const useNotifications = () => useNotificationsStore();