import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const paymentsApi = {
  async createPaymentIntent(bookingData) {
    const { data } = await axios.post(`${API_URL}/payments/create-intent`, bookingData);
    return data;
  },

  async getProviderBalance(providerId) {
    const { data } = await axios.get(`${API_URL}/providers/${providerId}/balance`);
    return data;
  },

  async getTransactionHistory(providerId, params) {
    const { data } = await axios.get(`${API_URL}/providers/${providerId}/transactions`, {
      params
    });
    return data;
  },

  async requestPayout(providerId, amount) {
    const { data } = await axios.post(`${API_URL}/providers/${providerId}/payouts`, {
      amount
    });
    return data;
  },

  async getPayoutHistory(providerId, params) {
    const { data } = await axios.get(`${API_URL}/providers/${providerId}/payouts`, {
      params
    });
    return data;
  }
};

export default paymentsApi;