import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const bookingsApi = {
  async create(bookingData) {
    const { data } = await axios.post(`${API_URL}/bookings`, bookingData);
    return data;
  },

  async getByUser(userId) {
    const { data } = await axios.get(`${API_URL}/users/${userId}/bookings`);
    return data;
  },

  async getByProvider(providerId) {
    const { data } = await axios.get(`${API_URL}/providers/${providerId}/bookings`);
    return data;
  },

  async getById(id) {
    const { data } = await axios.get(`${API_URL}/bookings/${id}`);
    return data;
  },

  async updateStatus(id, status) {
    const { data } = await axios.patch(`${API_URL}/bookings/${id}/status`, { status });
    return data;
  },

  async cancel(id, reason) {
    const { data } = await axios.post(`${API_URL}/bookings/${id}/cancel`, { reason });
    return data;
  },

  async getAnalytics(providerId, params) {
    const { data } = await axios.get(`${API_URL}/providers/${providerId}/booking-analytics`, {
      params
    });
    return data;
  }
};

export default bookingsApi;