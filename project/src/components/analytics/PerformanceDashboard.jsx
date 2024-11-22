import { useState, useEffect } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PerformanceDashboard() {
  const { getPerformanceMetrics, isLoading } = useAnalytics();
  const [period, setPeriod] = useState('7d');
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const data = await getPerformanceMetrics(period);
      setMetrics(data);
    };
    fetchMetrics();
  }, [period]);

  if (isLoading || !metrics) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="h-96 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const chartData = {
    labels: metrics.timeline.map(t => t.date),
    datasets: [
      {
        label: 'Bookings',
        data: metrics.timeline.map(t => t.bookings),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Revenue',
        data: metrics.timeline.map(t => t.revenue),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Performance Dashboard</h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="input"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {metrics.totalBookings}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            <span className={metrics.bookingsTrend >= 0 ? 'text-green-600' : 'text-red-600'}>
              {metrics.bookingsTrend}%
            </span>
            {' '}vs previous period
          </p>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            ${metrics.totalRevenue.toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            <span className={metrics.revenueTrend >= 0 ? 'text-green-600' : 'text-red-600'}>
              {metrics.revenueTrend}%
            </span>
            {' '}vs previous period
          </p>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-500">Average Order Value</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            ${metrics.averageOrderValue}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            <span className={metrics.aovTrend >= 0 ? 'text-green-600' : 'text-red-600'}>
              {metrics.aovTrend}%
            </span>
            {' '}vs previous period
          </p>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {metrics.conversionRate}%
          </p>
          <p className="mt-2 text-sm text-gray-500">
            <span className={metrics.conversionTrend >= 0 ? 'text-green-600' : 'text-red-600'}>
              {metrics.conversionTrend}%
            </span>
            {' '}vs previous period
          </p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Performance Trends</h3>
        <div className="h-96">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: 'index',
                intersect: false,
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Top Activities</h3>
          <div className="space-y-4">
            {metrics.topActivities.map((activity) => (
              <div key={activity.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.bookings} bookings</p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  ${activity.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Top Locations</h3>
          <div className="space-y-4">
            {metrics.topLocations.map((location) => (
              <div key={location.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{location.name}</p>
                  <p className="text-sm text-gray-500">{location.bookings} bookings</p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  ${location.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}