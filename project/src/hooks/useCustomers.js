import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

const useCustomersStore = create((set, get) => ({
  customers: [],
  isLoading: false,
  error: null,

  // Get provider customers
  getProviderCustomers: () => {
    // Return mock data for development
    return [
      {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1 234-567-8900',
        location: 'New York, USA',
        status: 'Active',
        totalBookings: 5,
        joinedAt: '2023-01-15'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1 234-567-8901',
        location: 'Los Angeles, USA',
        status: 'Active',
        totalBookings: 3,
        joinedAt: '2023-02-20'
      },
      {
        id: 3,
        name: 'Michael Brown',
        email: 'michael@example.com',
        phone: '+1 234-567-8902',
        location: 'Chicago, USA',
        status: 'Active',
        totalBookings: 7,
        joinedAt: '2023-03-10'
      }
    ];
  },

  // Get customer details
  getCustomerDetails: async (customerId) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.get(`/customers/${customerId}`);
      return data.customer;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message });
      toast.error(`Failed to fetch customer details: ${message}`);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Update customer status
  updateCustomerStatus: async (customerId, status) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.patch(`/customers/${customerId}/status`, { status });
      
      set(state => ({
        customers: state.customers.map(customer =>
          customer.id === customerId ? { ...customer, status } : customer
        )
      }));

      toast.success('Customer status updated successfully');
      return data.customer;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message });
      toast.error(`Failed to update customer status: ${message}`);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Get customer analytics
  getCustomerAnalytics: async (customerId) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.get(`/customers/${customerId}/analytics`);
      return data;
    } catch (error) {
      console.error('Failed to fetch customer analytics:', error);
      return {
        totalSpent: 0,
        averageBookingValue: 0,
        bookingFrequency: 0,
        lastBooking: null
      };
    } finally {
      set({ isLoading: false });
    }
  }
}));

export const useCustomers = () => useCustomersStore();