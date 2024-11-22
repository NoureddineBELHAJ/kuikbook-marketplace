import { useState } from 'react';
import { clsx } from 'clsx';
import BookingDetailsModal from '../../components/Admin/BookingDetailsModal';

export default function AdminBookings() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const bookings = [
    {
      id: 1,
      activity: 'Desert Safari Adventure',
      customer: 'John Smith',
      date: '2023-12-15',
      status: 'Confirmed',
      amount: 99,
      participants: 2,
      notes: 'Special dietary requirements: vegetarian'
    },
    {
      id: 2,
      activity: 'Cooking Class in Rome',
      customer: 'Mary Johnson',
      date: '2023-12-20',
      status: 'Pending',
      amount: 79,
      participants: 1
    },
    {
      id: 3,
      activity: 'Mountain Hiking',
      customer: 'Robert Brown',
      date: '2023-12-18',
      status: 'Cancelled',
      amount: 149,
      participants: 4
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Bookings</h2>
      </div>

      <div className="card overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{booking.activity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{booking.customer}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{booking.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getStatusColor(booking.status)
                  )}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${booking.amount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleViewBooking(booking)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}