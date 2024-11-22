import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

const activitiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: (params) => ({
        url: '/activities',
        params
      }),
      providesTags: ['Activity']
    }),
    getActivityById: builder.query({
      query: (id) => `/activities/${id}`,
      providesTags: (result, error, id) => [{ type: 'Activity', id }]
    }),
    createActivity: builder.mutation({
      query: (data) => ({
        url: '/activities',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Activity']
    }),
    updateActivity: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/activities/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Activity', id }]
    })
  })
});

export const {
  useGetActivitiesQuery,
  useGetActivityByIdQuery,
  useCreateActivityMutation,
  useUpdateActivityMutation
} = activitiesApi;

const activitySlice = createSlice({
  name: 'activities',
  initialState: {
    activities: [],
    filters: {
      category: null,
      priceRange: null,
      rating: null,
      location: null
    },
    sort: {
      field: 'createdAt',
      order: 'desc'
    },
    pagination: {
      page: 1,
      limit: 12,
      total: 0
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.pagination.page = 1;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    }
  }
});

export const { setFilters, setSort, setPage } = activitySlice.actions;
export default activitySlice.reducer;