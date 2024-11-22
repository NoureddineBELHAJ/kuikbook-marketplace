import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookingReducer from './slices/bookingSlice';
import activityReducer from './slices/activitySlice';
import settingsReducer from './slices/settingsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  bookings: bookingReducer,
  activities: activityReducer,
  settings: settingsReducer
});

export default rootReducer;