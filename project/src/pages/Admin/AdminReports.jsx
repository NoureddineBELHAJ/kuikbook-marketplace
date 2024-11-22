import { useState } from 'react';
import { 
  ChartBarIcon, 
  UsersIcon, 
  CalendarIcon,
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

export default function AdminReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const reports = [
    {
      title: 'User Growth',
      icon: UsersIcon,
      description: 'Track user registration and engagement trends',
      link: '/admin/reports/users'
    },
    {
      title: 'Booking Analytics',
      icon: CalendarIcon,
      description: 'Analyze booking patterns and popular activities',
      link: '/admin/reports/bookings'
    },
    {
      title: 'Revenue Reports',
      icon: CurrencyDollarIcon,
      description: 'Monitor revenue streams and financial performance',
      link: '/admin/reports/revenue'
    },
    {
      title: 'Performance Metrics',
      icon: ChartBarIcon,
      description: 'View platform performance and key metrics',
      link: '/admin/reports/metrics'
    }
  ];

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Reports</h2>
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {reports.map((report) => (
          <div key={report.title} className="card p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <report.icon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{report.description}</p>
                <a
                  href={report.link}
                  className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  View Report →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for charts and detailed metrics */}
      <div className="card p-6">
        <div className="text-center py-12">
          <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No data available</h3>
          <p className="mt-1 text-sm text-gray-500">
            Select a report from above to view detailed metrics
          </p>
        </div>
      </div>
    </div>
  );
}