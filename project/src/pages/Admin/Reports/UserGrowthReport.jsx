import { useState } from 'react';
import { 
  UsersIcon, 
  UserPlusIcon,
  UserMinusIcon,
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';
import { useReports } from '../../../hooks/useReports';
import MetricsCard from '../../../components/Admin/MetricsCard';

export default function UserGrowthReport() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const { getReport } = useReports();
  const report = getReport('users', selectedPeriod);

  const metrics = [
    {
      name: 'Total Users',
      value: report.total.toLocaleString(),
      change: '+12%',
      icon: UsersIcon
    },
    {
      name: 'New Users',
      value: report.new.toLocaleString(),
      change: '+8%',
      icon: UserPlusIcon
    },
    {
      name: 'Churn Rate',
      value: `${report.churnRate}%`,
      change: '-0.5%',
      icon: UserMinusIcon
    },
    {
      name: 'Growth Rate',
      value: `${report.growthRate}%`,
      change: '+1.2%',
      icon: ArrowTrendingUpIcon
    }
  ];

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">User Growth Report</h2>
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
        <h3 className="text-lg font-medium text-gray-900 mb-4">Growth Trends</h3>
        <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart visualization will be displayed here</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Demographics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Individual Users</span>
              <span className="text-sm font-medium text-gray-900">{report.demographics.individual}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Corporate Users</span>
              <span className="text-sm font-medium text-gray-900">{report.demographics.corporate}%</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Activity</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Active Users</span>
              <span className="text-sm font-medium text-gray-900">{report.activity.active}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Inactive Users</span>
              <span className="text-sm font-medium text-gray-900">{report.activity.inactive}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}