import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const tabs = [
  { name: 'Overview', href: '/profile' },
  { name: 'Bookings', href: '/profile/bookings' },
  { name: 'Settings', href: '/profile/settings' },
  { name: 'Saved', href: '/profile/saved' },
];

export default function ProfileNavigation() {
  const location = useLocation();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="-mb-px flex space-x-8" aria-label="Profile Navigation">
          {tabs.map((tab) => {
            const isActive = 
              tab.href === '/profile' 
                ? location.pathname === '/profile'
                : location.pathname === tab.href;

            return (
              <Link
                key={tab.name}
                to={tab.href}
                className={clsx(
                  isActive
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}