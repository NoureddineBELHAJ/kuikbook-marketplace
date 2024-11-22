import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAdmin } from '../../hooks/useAdminStore';
import { 
  UsersIcon, 
  CalendarIcon, 
  StarIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';
import MetricsCard from '../../components/Admin/MetricsCard';
import RealTimeMetrics from '../../components/analytics/RealTimeMetrics';
import GuideLink from '../../components/documentation/GuideLink';
import { Line } from 'react-chartjs-2';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stats, initialize } = useAdmin();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await initialize();
      } catch (error) {
        console.error('Error initializing dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [initialize]);

  const metrics = [
    { 
      name: 'Total Users', 
      value: stats.totalUsers.toLocaleString(), 
      change: '+12%',
      icon: UsersIcon 
    },
    { 
      name: 'Active Bookings', 
      value: stats.activeBookings.toLocaleString(), 
      change: '+8%',
      icon: CalendarIcon 
    },
    { 
      name: 'Reviews', 
      value: stats.totalReviews.toLocaleString(), 
      change: '+15%',
      icon: StarIcon 
    },
    { 
      name: 'Revenue', 
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+23%', 
      icon: CurrencyDollarIcon 
    }
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true
      },
      {
        label: 'Bookings',
        data: [100, 150, 120, 200, 180, 250],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true
      }
    ]
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-2 text-gray-600">Manage and monitor platform activities</p>
            </div>
            <div className="flex space-x-4">
              <GuideLink 
                title="Admin Guide"
                path="/docs/admin-guide.pdf"
                className="text-admin-600 bg-admin-50 hover:bg-admin-100"
              />
              <GuideLink 
                title="Technical Guide"
                path="/docs/admin-technical-guide.pdf"
                className="text-admin-600 bg-admin-50 hover:bg-admin-100"
              />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricsCard key={metric.name} metric={metric} />
          ))}
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Performance Overview</h2>
          <div className="h-96">
            <Line 
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'booking' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'user' ? <UsersIcon className="h-5 w-5" /> :
                     activity.type === 'booking' ? <CalendarIcon className="h-5 w-5" /> :
                     <StarIcon className="h-5 w-5" />}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time Analytics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Real-Time Analytics</h2>
          <RealTimeMetrics />
        </div>
      </div>
    </div>
  );
}