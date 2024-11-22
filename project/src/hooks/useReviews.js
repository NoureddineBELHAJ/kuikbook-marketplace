import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

const useReviewsStore = create((set, get) => ({
  reviews: [],
  isLoading: false,
  error: null,

  // Get provider reviews
  getProviderReviews: (providerId) => {
    // Return mock data for development
    return [
      {
        id: 1,
        activity: 'Desert Safari Adventure',
        customer: 'John Smith',
        rating: 5,
        comment: 'Amazing experience!',
        date: '2023-12-01'
      },
      {
        id: 2,
        activity: 'City Tour',
        customer: 'Jane Doe',
        rating: 4,
        comment: 'Great tour!',
        date: '2023-11-28'
      }
    ];
  },

  // Get traveler reviews
  getTravelerReviews: (travelerId) => {
    // Return mock data for development
    return [
      {
        id: 1,
        activity: 'Mountain Hiking',
        location: 'Swiss Alps',
        rating: 5,
        comment: 'Breathtaking views!',
        date: '2023-12-01'
      },
      {
        id: 2,
        activity: 'Food Tour',
        location: 'Rome',
        rating: 4,
        comment: 'Delicious experience!',
        date: '2023-11-25'
      }
    ];
  },

  // Create review
  createReview: async (reviewData) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.post('/reviews', reviewData);
      
      set(state => ({
        reviews: [...state.reviews, data.review]
      }));

      toast.success('Review submitted successfully');
      return data.review;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message });
      toast.error(`Failed to submit review: ${message}`);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Update review status
  updateReviewStatus: async (reviewId, status) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.patch(`/reviews/${reviewId}/status`, { status });
      
      set(state => ({
        reviews: state.reviews.map(review =>
          review.id === reviewId ? { ...review, status } : review
        )
      }));

      toast.success(`Review ${status.toLowerCase()} successfully`);
      return data.review;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message });
      toast.error(`Failed to update review: ${message}`);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));

export const useReviews = () => useReviewsStore();