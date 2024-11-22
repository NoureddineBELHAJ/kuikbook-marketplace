import { CalendarIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';

export default function ProfileOverview() {
  const stats = [
    { name: 'Total Bookings', value: '12', icon: CalendarIcon },
    { name: 'Places Visited', value: '5', icon: MapPinIcon },
    { name: 'Reviews Given', value: '8', icon: StarIcon },
  ];

  const recentActivities = [
    { id: 1, type: 'booking', title: 'Desert Safari Adventure', date: '2023-11-15' },
    { id: 2, type: 'review', title: 'Cooking Class in Rome', date: '2023-11-10' },
    { id: 3, type: 'saved', title: 'Mountain Hiking Adventure', date: '2023-11-05' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.date}</p>
              </div>
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary-100 text-primary-800">
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}