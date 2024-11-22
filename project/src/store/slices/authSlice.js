import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;