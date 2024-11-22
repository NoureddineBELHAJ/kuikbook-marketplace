import { useState, useEffect } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { 
  UsersIcon, 
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

export default function RealTimeMetrics() {
  const { getRealTimeAnalytics } = useAnalytics();
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const data = await getRealTimeAnalytics();
      setMetrics(data);
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!metrics) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Real-Time Analytics</h2>
        <span className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UsersIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metrics.activeUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ShoppingCartIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Current Bookings</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metrics.currentBookings}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyDollarIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Revenue Today</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${metrics.revenueToday.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metrics.conversionRate}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Popular Activities</h3>
          <div className="space-y-4">
            {metrics.popularActivities.map((activity) => (
              <div key={activity.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.views} views</p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {activity.bookings} bookings
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Active Locations</h3>
          <div className="space-y-4">
            {metrics.activeLocations.map((location) => (
              <div key={location.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{location.name}</p>
                  <p className="text-sm text-gray-500">{location.activeUsers} users</p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {location.bookings} bookings
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}