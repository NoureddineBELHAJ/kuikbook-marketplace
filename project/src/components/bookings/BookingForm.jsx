import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookings } from '../../hooks/useBookings';
import { useAuth } from '../../hooks/useAuth';
import DatePicker from 'react-datepicker';
import { format, addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

export default function BookingForm({ activity }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { createBooking, checkAvailability, isLoading } = useBookings();
  
  const [formData, setFormData] = useState({
    date: new Date(),
    participants: 1,
    specialRequests: ''
  });
  
  const [isAvailable, setIsAvailable] = useState(true);

  // Check availability whenever date or participants change
  useEffect(() => {
    const checkSlotAvailability = async () => {
      const available = await checkAvailability(
        activity.id,
        format(formData.date, 'yyyy-MM-dd'),
        formData.participants
      );
      setIsAvailable(available);
    };

    checkSlotAvailability();
  }, [formData.date, formData.participants, activity.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: `/activities/${activity.id}`,
          bookingData: formData
        }
      });
      return;
    }

    try {
      const booking = await createBooking({
        activityId: activity.id,
        userId: user.id,
        ...formData
      });

      navigate('/checkout', { 
        state: { 
          bookingId: booking.id,
          amount: activity.price * formData.participants
        }
      });
    } catch (error) {
      // Error is handled by the hook
      console.error('Booking failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select Date
        </label>
        <DatePicker
          selected={formData.date}
          onChange={date => setFormData({ ...formData, date })}
          minDate={new Date()}
          maxDate={addDays(new Date(), 90)}
          className="input mt-1 w-full"
          dateFormat="MMMM d, yyyy"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Number of Participants
        </label>
        <select
          value={formData.participants}
          onChange={e => setFormData({ 
            ...formData, 
            participants: parseInt(e.target.value)
          })}
          className="input mt-1"
          required
        >
          {[...Array(activity.maxParticipants)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} {i === 0 ? 'person' : 'people'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Special Requests
        </label>
        <textarea
          value={formData.specialRequests}
          onChange={e => setFormData({ 
            ...formData, 
            specialRequests: e.target.value 
          })}
          className="input mt-1"
          rows={3}
          placeholder="Any special requirements or requests?"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Price per person</span>
          <span className="font-medium text-gray-900">
            ${activity.price}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total participants</span>
          <span className="font-medium text-gray-900">
            {formData.participants}
          </span>
        </div>

        <div className="pt-4 flex justify-between items-center border-t border-gray-200">
          <span className="text-lg font-medium text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">
            ${activity.price * formData.participants}
          </span>
        </div>
      </div>

      {!isAvailable && (
        <div className="text-sm text-red-600">
          This time slot is no longer available. Please select another date.
        </div>
      )}

      <button
        type="submit"
        className="btn-primary w-full"
        disabled={isLoading || !isAvailable}
      >
        {isLoading ? 'Processing...' : 'Book Now'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By booking, you agree to our{' '}
        <a href="/terms" className="text-primary-600 hover:text-primary-500">
          Terms & Conditions
        </a>
        {' '}and{' '}
        <a href="/cancellation-policy" className="text-primary-600 hover:text-primary-500">
          Cancellation Policy
        </a>
      </p>
    </form>
  );
}