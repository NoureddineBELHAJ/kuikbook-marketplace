import { create } from 'zustand';
import { getStorageItem, setStorageItem } from '../utils/localStorage';

const STORAGE_KEY = 'kuikbook_reports';

const useReportsStore = create((set, get) => ({
  reports: getStorageItem(STORAGE_KEY, {
    users: {
      total: 1234,
      new: 145,
      churnRate: 2.3,
      growthRate: 5.7,
      demographics: {
        individual: 65,
        corporate: 35
      },
      activity: {
        active: 892,
        inactive: 342
      }
    },
    bookings: {
      total: 856,
      revenue: 45678,
      avgGroupSize: 3.2,
      avgDuration: 4.5,
      popular: [
        { name: 'Desert Safari Adventure', count: 156 },
        { name: 'City Walking Tour', count: 124 },
        { name: 'Cooking Class', count: 98 }
      ],
      status: {
        confirmed: 75,
        pending: 15,
        cancelled: 10
      }
    },
    revenue: {
      total: 125678,
      avgOrderValue: 146.50,
      transactionVolume: 856,
      growthRate: 15.7,
      byType: {
        adventure: 45678,
        cultural: 35890,
        food: 28456
      },
      paymentMethods: {
        creditCard: 68,
        digitalWallet: 25,
        bankTransfer: 7
      }
    },
    performance: {
      uptime: 99.9,
      responseTime: 245,
      satisfaction: 4.8,
      issuesResolved: 95,
      system: {
        cpu: 45,
        memory: 62,
        storage: 38
      },
      errors: {
        api: 0.05,
        client: 0.12,
        server: 0.01
      }
    }
  }),

  getReport: (type, period = 'month') => {
    const state = get();
    return state.reports[type] || null;
  },

  updateReport: (type, data) => {
    set(state => {
      const updatedReports = {
        ...state.reports,
        [type]: {
          ...state.reports[type],
          ...data
        }
      };
      setStorageItem(STORAGE_KEY, updatedReports);
      return { reports: updatedReports };
    });
  }
}));

export const useReports = () => useReportsStore();