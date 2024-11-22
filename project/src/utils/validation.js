import * as yup from 'yup';

// Common validation schemas
export const emailSchema = yup.string()
  .email('Invalid email address')
  .required('Email is required');

export const passwordSchema = yup.string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .required('Password is required');

export const phoneSchema = yup.string()
  .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
  .required('Phone number is required');

// Activity validation schema
export const activitySchema = yup.object({
  title: yup.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must not exceed 100 characters')
    .required('Title is required'),
  description: yup.string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must not exceed 1000 characters')
    .required('Description is required'),
  price: yup.number()
    .positive('Price must be positive')
    .required('Price is required'),
  duration: yup.number()
    .positive('Duration must be positive')
    .required('Duration is required'),
  maxParticipants: yup.number()
    .positive('Maximum participants must be positive')
    .required('Maximum participants is required'),
  location: yup.object({
    name: yup.string().required('Location name is required'),
    address: yup.string().required('Address is required'),
    coordinates: yup.object({
      lat: yup.number().required('Latitude is required'),
      lng: yup.number().required('Longitude is required')
    }).required('Coordinates are required')
  }).required('Location is required')
});

// Booking validation schema
export const bookingSchema = yup.object({
  activityId: yup.string().required('Activity is required'),
  date: yup.date()
    .min(new Date(), 'Date must be in the future')
    .required('Date is required'),
  participants: yup.number()
    .positive('Number of participants must be positive')
    .required('Number of participants is required'),
  specialRequests: yup.string()
    .max(500, 'Special requests must not exceed 500 characters')
});

// Review validation schema
export const reviewSchema = yup.object({
  rating: yup.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must not exceed 5')
    .required('Rating is required'),
  comment: yup.string()
    .min(10, 'Comment must be at least 10 characters')
    .max(500, 'Comment must not exceed 500 characters')
    .required('Comment is required')
});