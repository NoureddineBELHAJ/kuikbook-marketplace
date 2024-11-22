import { useState } from 'react';
import { 
  CalendarIcon, 
  CurrencyDollarIcon,
  UserGroupIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';
import { useReports } from '../../../hooks/useReports';
import MetricsCard from '../../../components/Admin/MetricsCard';

export default function BookingAnalyticsReport() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const { getReport } = useReports();
  const report = getReport('bookings', selectedPeriod);

  const metrics = [
    {
      name: 'Total Bookings',
      value: report.total.toLocaleString(),
      change: '+15%',
      icon: CalendarIcon
    },
    {
      name: 'Revenue',
      value: `$${report.revenue.toLocaleString()}`,
      change: '+23%',
      icon: CurrencyDollarIcon
    },
    {
      name: 'Average Group Size',
      value: report.avgGroupSize.toFixed(1),
      change: '+0.5',
      icon: UserGroupIcon
    },
    {
      name: 'Average Duration',
      value: `${report.avgDuration}h`,
      change: '+0.2',
      icon: ClockIcon
    }
  ];

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Booking Analytics</h2>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="input"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricsCard key={metric.name} metric={metric} />
        ))}
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Trends</h3>
        <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart visualization will be displayed here</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Activities</h3>
          <div className="space-y-4">
            {report.popular.map((activity) => (
              <div key={activity.name} className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{activity.name}</span>
                <span className="text-sm font-medium text-gray-900">{activity.count} bookings</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Confirmed</span>
              <span className="text-sm font-medium text-gray-900">{report.status.confirmed}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Pending</span>
              <span className="text-sm font-medium text-gray-900">{report.status.pending}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Cancelled</span>
              <span className="text-sm font-medium text-gray-900">{report.status.cancelled}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}