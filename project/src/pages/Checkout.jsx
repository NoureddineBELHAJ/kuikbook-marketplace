import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useBookings } from '../hooks/useBookings';
import { useErrorHandler } from '../hooks/useErrorHandler';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { createBooking } = useBookings();
  const { handleError } = useErrorHandler();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const bookingDetails = location.state;

  if (!bookingDetails) {
    return <Navigate to="/activities" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname, bookingDetails }} replace />;
  }

  // Rest of the component remains the same
}