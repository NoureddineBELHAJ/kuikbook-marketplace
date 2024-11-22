import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingCard({ activity }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [participants, setParticipants] = useState(1);

  const handleBookNow = (e) => {
    e.preventDefault();
    // Add booking logic here
    navigate('/checkout', {
      state: {
        activityId: activity.id,
        date: selectedDate,
        participants,
        totalAmount: calculateTotal()
      }
    });
  };

  const calculateSubtotal = () => activity.price * participants;
  const calculateServiceFee = () => Math.round(calculateSubtotal() * 0.1);
  const calculateTotal = () => calculateSubtotal() + calculateServiceFee();

  return (
    <div className="card p-6 sticky top-8">
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-bold text-gray-900">
          {activity.currency} {activity.price}
        </h3>
        <span className="text-sm text-gray-500">per person</span>
      </div>

      <form onSubmit={handleBookNow} className="mt-6 space-y-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Select Date
          </label>
          <input
            type="date"
            id="date"
            className="input mt-1"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div>
          <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
            Number of Participants
          </label>
          <select
            id="participants"
            className="input mt-1"
            value={participants}
            onChange={(e) => setParticipants(Number(e.target.value))}
            required
          >
            {[...Array(activity.maxParticipants)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? 'person' : 'people'}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {activity.currency} {activity.price} × {participants}
            </span>
            <span className="font-medium text-gray-900">
              {activity.currency} {calculateSubtotal()}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-600">Service fee</span>
            <span className="font-medium text-gray-900">
              {activity.currency} {calculateServiceFee()}
            </span>
          </div>
          <div className="flex justify-between text-base font-medium mt-4 pt-4 border-t border-gray-200">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">
              {activity.currency} {calculateTotal()}
            </span>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full">
          Book Now
        </button>
      </form>
    </div>
  );
}