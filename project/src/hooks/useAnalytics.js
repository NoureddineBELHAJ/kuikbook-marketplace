import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

const useAnalyticsStore = create((set, get) => ({
  data: {},
  isLoading: false,
  error: null,

  // Get real-time analytics
  getRealTimeAnalytics: () => {
    // Return mock data for development
    return {
      activeUsers: 125,
      currentBookings: 45,
      revenueToday: 2500,
      conversionRate: 3.2,
      popularActivities: [
        { id: 1, title: 'Desert Safari', views: 245, bookings: 12 },
        { id: 2, title: 'City Tour', views: 180, bookings: 8 }
      ],
      activeLocations: [
        { id: 1, name: 'Dubai', activeUsers: 45, bookings: 15 },
        { id: 2, name: 'Rome', activeUsers: 32, bookings: 10 }
      ]
    };
  },

  // Get performance metrics
  getPerformanceMetrics: (period = '7d') => {
    // Return mock data for development
    return {
      totalBookings: 856,
      bookingsTrend: 12,
      totalRevenue: 45678,
      revenueTrend: 23,
      averageOrderValue: 89,
      aovTrend: 5,
      conversionRate: 3.2,
      conversionTrend: 0.5,
      timeline: [
        { date: '2023-12-01', bookings: 120, revenue: 12000 },
        { date: '2023-12-02', bookings: 150, revenue: 15000 }
      ],
      topActivities: [
        { id: 1, title: 'Desert Safari', bookings: 45, revenue: 4500 },
        { id: 2, title: 'City Tour', bookings: 32, revenue: 3200 }
      ],
      topLocations: [
        { id: 1, name: 'Dubai', bookings: 78, revenue: 7800 },
        { id: 2, name: 'Rome', bookings: 65, revenue: 6500 }
      ]
    };
  },

  // Get custom report
  getCustomReport: () => {
    // Return mock data for development
    return {
      rows: [
        { date: '2023-12-01', revenue: 1200, bookings: 12 },
        { date: '2023-12-02', revenue: 1500, bookings: 15 }
      ],
      total: {
        revenue: 2700,
        bookings: 27
      }
    };
  },

  // Get scheduled reports
  getScheduledReports: () => {
    // Return mock data for development
    return [
      {
        id: 1,
        name: 'Monthly Revenue Report',
        description: 'Revenue breakdown by activity and location',
        schedule: 'monthly',
        format: 'pdf',
        nextRun: '2024-01-01'
      }
    ];
  },

  // Schedule report
  scheduleReport: (reportConfig) => {
    // Return mock data for development
    return {
      id: Date.now(),
      ...reportConfig,
      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  }
}));

export const useAnalytics = () => useAnalyticsStore();