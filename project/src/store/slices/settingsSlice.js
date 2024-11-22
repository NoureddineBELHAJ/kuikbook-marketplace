import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    currency: 'USD',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    accessibility: {
      reduceMotion: false,
      highContrast: false,
      largeText: false
    },
    performance: {
      enableVirtualization: true,
      imageLazyLoading: true,
      prefetch: true
    }
  },
  reducers: {
    updateTheme: (state, action) => {
      state.theme = action.payload;
    },
    updateLanguage: (state, action) => {
      state.language = action.payload;
    },
    updateNotifications: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updateCurrency: (state, action) => {
      state.currency = action.payload;
    },
    updateAccessibility: (state, action) => {
      state.accessibility = { ...state.accessibility, ...action.payload };
    },
    updatePerformance: (state, action) => {
      state.performance = { ...state.performance, ...action.payload };
    }
  }
});

export const {
  updateTheme,
  updateLanguage,
  updateNotifications,
  updateCurrency,
  updateAccessibility,
  updatePerformance
} = settingsSlice.actions;

export default settingsSlice.reducer;