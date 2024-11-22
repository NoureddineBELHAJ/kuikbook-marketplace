import toast from 'react-hot-toast';

export const initErrorMonitoring = () => {
  // In a production environment, you would initialize Sentry here
  if (import.meta.env.PROD) {
    console.log('Error monitoring initialized in production mode');
  }
};

export const captureError = (error, context = {}) => {
  // Log the error to console in development
  console.error('Error:', error);
  console.error('Context:', context);

  // In production, you would send this to your error monitoring service
  if (import.meta.env.PROD) {
    // Production error handling would go here
    console.error('Production error:', { error, context });
  }

  // Return a user-friendly error message
  return getErrorMessage(error);
};

const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  switch (error.code) {
    case 'auth/user-not-found':
      return 'No account found with this email address';
    case 'auth/wrong-password':
      return 'Invalid password';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection';
    case 'ERR_NETWORK':
      return 'Network error. Please check your connection';
    case 'ERR_BAD_REQUEST':
      return 'Invalid request. Please check your input';
    case 'ERR_SERVER':
      return 'Server error. Please try again later';
    case 'ERR_UNAUTHORIZED':
      return 'Please log in to continue';
    case 'ERR_FORBIDDEN':
      return 'You do not have permission to perform this action';
    case 'ERR_NOT_FOUND':
      return 'The requested resource was not found';
    case 'ERR_TIMEOUT':
      return 'Request timed out. Please try again';
    default:
      return error.message || 'An unexpected error occurred';
  }
};