import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useActivities } from '../../hooks/useActivities';
import { useBookings } from '../../hooks/useBookings';
import { usePayments } from '../../hooks/usePayments';
import { 
  CalendarIcon, 
  CurrencyDollarIcon,
  StarIcon,
  ClipboardDocumentListIcon,
  PlusIcon,
  UserGroupIcon,
  MapPinIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import GuideLink from '../../components/documentation/GuideLink';
import AddActivityModal from '../../components/Provider/AddActivityModal';
import ProviderStats from '../../components/Provider/ProviderStats';
import ActivityCalendar from '../../components/Provider/ActivityCalendar';

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getProviderActivities } = useActivities();
  const { getProviderBookings } = useBookings();
  const { getProviderBalance } = usePayments();
  const [showAddModal, setShowAddModal] = useState(false);

  // State for async data
  const [activities, setActivities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [balance, setBalance] = useState({ totalRevenue: 0 });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          const [activitiesData, bookingsData, balanceData] = await Promise.all([
            getProviderActivities(user.id),
            getProviderBookings(user.id),
            getProviderBalance(user.id)
          ]);

          setActivities(activitiesData || []);
          setBookings(bookingsData || []);
          setBalance(balanceData || { totalRevenue: 0 });
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      }
    };

    fetchData();
  }, [user?.id]);

  const stats = [
    {
      name: 'Total Revenue',
      value: `$${balance.totalRevenue.toLocaleString()}`,
      change: '+23%',
      icon: CurrencyDollarIcon,
      color: 'text-green-600'
    },
    {
      name: 'Active Bookings',
      value: bookings.filter(b => b.status === 'Active').length,
      change: '+12%',
      icon: CalendarIcon,
      color: 'text-blue-600'
    },
    {
      name: 'Total Activities',
      value: activities.length,
      change: '+5',
      icon: ClipboardDocumentListIcon,
      color: 'text-provider-600'
    },
    {
      name: 'Total Customers',
      value: '1.2k',
      change: '+18%',
      icon: UserGroupIcon,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Business Profile Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-12 w-12 text-provider-600" />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.companyName || 'Your Business'}
              </h1>
              <p className="text-gray-500">
                {user?.address || 'Update your business profile'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/provider/profile')}
            className="btn-secondary"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <PlusIcon className="h-6 w-6 text-provider-600" />
          <span className="ml-3 text-sm font-medium text-gray-900">Add Activity</span>
        </button>
        <button
          onClick={() => navigate('/provider/bookings')}
          className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <CalendarIcon className="h-6 w-6 text-provider-600" />
          <span className="ml-3 text-sm font-medium text-gray-900">View Bookings</span>
        </button>
        <button
          onClick={() => navigate('/provider/earnings')}
          className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <CurrencyDollarIcon className="h-6 w-6 text-provider-600" />
          <span className="ml-3 text-sm font-medium text-gray-900">View Earnings</span>
        </button>
        <button
          onClick={() => navigate('/provider/activities')}
          className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <ClipboardDocumentListIcon className="h-6 w-6 text-provider-600" />
          <span className="ml-3 text-sm font-medium text-gray-900">Manage Activities</span>
        </button>
      </div>

      {/* Stats Overview */}
      <ProviderStats stats={stats} />

      {/* Activity Calendar */}
      <ActivityCalendar bookings={bookings} />

      <AddActivityModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}