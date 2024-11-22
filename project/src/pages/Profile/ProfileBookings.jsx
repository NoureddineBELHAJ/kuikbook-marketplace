export default function ProfileBookings() {
  const bookings = [
    {
      id: 1,
      activity: 'Desert Safari Adventure',
      date: '2023-12-15',
      status: 'Upcoming',
      price: 99,
    },
    {
      id: 2,
      activity: 'Cooking Class in Rome',
      date: '2023-11-20',
      status: 'Completed',
      price: 79,
    },
  ];

  return (
    <div className="space-y-6 animate-enter">
      <div className="card overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Your Bookings</h2>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <li key={booking.id} className="p-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900">{booking.activity}</p>
                    <p className="text-sm text-gray-500">{booking.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      booking.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {booking.status}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      ${booking.price}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}