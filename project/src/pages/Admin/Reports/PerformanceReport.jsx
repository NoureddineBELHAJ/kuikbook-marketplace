import { useState } from 'react';
import { 
  ChartBarIcon, 
  ClockIcon,
  StarIcon,
  FlagIcon 
} from '@heroicons/react/24/outline';
import { useReports } from '../../../hooks/useReports';
import MetricsCard from '../../../components/Admin/MetricsCard';

export default function PerformanceReport() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const { getReport } = useReports();
  const report = getReport('performance', selectedPeriod);

  const metrics = [
    {
      name: 'Platform Uptime',
      value: `${report.uptime}%`,
      change: '+0.1%',
      icon: ChartBarIcon
    },
    {
      name: 'Response Time',
      value: `${report.responseTime}ms`,
      change: '-15ms',
      icon: ClockIcon
    },
    {
      name: 'User Satisfaction',
      value: `${report.satisfaction}/5`,
      change: '+0.2',
      icon: StarIcon
    },
    {
      name: 'Issues Resolved',
      value: `${report.issuesResolved}%`,
      change: '+3%',
      icon: FlagIcon
    }
  ];

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Performance Metrics</h2>
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
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Trends</h3>
        <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart visualization will be displayed here</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">CPU Usage</span>
              <span className="text-sm font-medium text-gray-900">{report.system.cpu}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Memory Usage</span>
              <span className="text-sm font-medium text-gray-900">{report.system.memory}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Storage Usage</span>
              <span className="text-sm font-medium text-gray-900">{report.system.storage}%</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Error Rates</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">API Errors</span>
              <span className="text-sm font-medium text-gray-900">{report.errors.api}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Client Errors</span>
              <span className="text-sm font-medium text-gray-900">{report.errors.client}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Server Errors</span>
              <span className="text-sm font-medium text-gray-900">{report.errors.server}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}