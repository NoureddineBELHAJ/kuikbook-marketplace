import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function BookingCard({ booking }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{booking.activity}</h3>
        <div className="mt-1 space-y-1">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-1.5" />
            {format(new Date(booking.date), 'MMMM d, yyyy')}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPinIcon className="h-4 w-4 mr-1.5" />
            {booking.location}
          </div>
        </div>
      </div>
      <div className="ml-4">
        <Link
          to={`/traveler/bookings/${booking.id}`}
          className="text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}