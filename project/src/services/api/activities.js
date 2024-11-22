import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const activitiesApi = {
  async getAll(params) {
    const { data } = await axios.get(`${API_URL}/activities`, { params });
    return data;
  },

  async getById(id) {
    const { data } = await axios.get(`${API_URL}/activities/${id}`);
    return data;
  },

  async create(activityData) {
    const { data } = await axios.post(`${API_URL}/activities`, activityData);
    return data;
  },

  async update(id, updates) {
    const { data } = await axios.patch(`${API_URL}/activities/${id}`, updates);
    return data;
  },

  async delete(id) {
    await axios.delete(`${API_URL}/activities/${id}`);
  },

  async getAvailability(id, date) {
    const { data } = await axios.get(`${API_URL}/activities/${id}/availability`, {
      params: { date }
    });
    return data;
  },

  async updateAvailability(id, availabilityData) {
    const { data } = await axios.post(
      `${API_URL}/activities/${id}/availability`,
      availabilityData
    );
    return data;
  },

  async getPricing(id, params) {
    const { data } = await axios.get(`${API_URL}/activities/${id}/pricing`, {
      params
    });
    return data;
  },

  async updatePricing(id, pricingData) {
    const { data } = await axios.post(
      `${API_URL}/activities/${id}/pricing`,
      pricingData
    );
    return data;
  }
};

export default activitiesApi;