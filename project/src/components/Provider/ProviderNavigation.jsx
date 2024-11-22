import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { 
  HomeIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  StarIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/provider', icon: HomeIcon },
  { name: 'Activities', href: '/provider/activities', icon: ClipboardDocumentListIcon },
  { name: 'Bookings', href: '/provider/bookings', icon: CalendarIcon },
  { name: 'Customers', href: '/provider/customers', icon: UserGroupIcon },
  { name: 'Analytics', href: '/provider/analytics', icon: ChartBarIcon },
  { name: 'Earnings', href: '/provider/earnings', icon: CurrencyDollarIcon },
  { name: 'Reviews', href: '/provider/reviews', icon: StarIcon },
  { name: 'Messages', href: '/provider/messages', icon: ChatBubbleLeftIcon },
  { name: 'Business Profile', href: '/provider/profile', icon: BuildingOfficeIcon },
  { name: 'Settings', href: '/provider/settings', icon: Cog6ToothIcon }
];

export default function ProviderNavigation() {
  const location = useLocation();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="-mb-px flex space-x-8" aria-label="Provider Navigation">
          {navigation.map((item) => {
            const isActive = 
              item.href === '/provider' 
                ? location.pathname === '/provider'
                : location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200',
                  isActive
                    ? 'border-provider-600 text-provider-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                )}
              >
                <item.icon className={clsx(
                  'h-5 w-5 mr-2',
                  isActive ? 'text-provider-600' : 'text-gray-400 group-hover:text-gray-500'
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}