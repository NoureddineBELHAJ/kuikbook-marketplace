import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

const bookingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: (userId) => `/users/${userId}/bookings`,
      providesTags: ['Booking']
    }),
    createBooking: builder.mutation({
      query: (data) => ({
        url: '/bookings',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Booking']
    }),
    updateBookingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/bookings/${id}/status`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: ['Booking']
    })
  })
});

export const {
  useGetBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingStatusMutation
} = bookingsApi;

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        bookingsApi.endpoints.getBookings.matchPending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        bookingsApi.endpoints.getBookings.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.bookings = action.payload;
        }
      )
      .addMatcher(
        bookingsApi.endpoints.getBookings.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        }
      );
  }
});

export default bookingSlice.reducer;