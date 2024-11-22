import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  StarIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
  { name: 'Activities', href: '/admin/activities', icon: ClipboardDocumentListIcon },
  { name: 'Bookings', href: '/admin/bookings', icon: CalendarIcon },
  { name: 'Reviews', href: '/admin/reviews', icon: StarIcon },
  { name: 'Reports', href: '/admin/reports', icon: ChartBarIcon },
  { name: 'Payments', href: '/admin/payments', icon: CurrencyDollarIcon },
  { name: 'Security', href: '/admin/security', icon: ShieldCheckIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon }
];

export default function AdminNavigation() {
  const location = useLocation();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="-mb-px flex space-x-8" aria-label="Admin Navigation">
          {navigation.map((item) => {
            const isActive = 
              item.href === '/admin' 
                ? location.pathname === '/admin'
                : location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  isActive
                    ? 'border-b-2 border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'flex flex-col items-center whitespace-nowrap py-4 px-1 text-sm font-medium transition-colors duration-200'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon className="h-5 w-5 mb-1" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}