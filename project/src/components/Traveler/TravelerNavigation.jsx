import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const tabs = [
  { name: 'Dashboard', href: '/traveler' },
  { name: 'Bookings', href: '/traveler/bookings' },
  { name: 'Saved', href: '/traveler/saved' },
  { name: 'Reviews', href: '/traveler/reviews' },
  { name: 'Favorites', href: '/traveler/favorites' },
  { name: 'Settings', href: '/traveler/settings' },
];

export default function TravelerNavigation() {
  const location = useLocation();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="-mb-px flex space-x-8" aria-label="Traveler Navigation">
          {tabs.map((tab) => {
            const isActive = 
              tab.href === '/traveler' 
                ? location.pathname === '/traveler'
                : location.pathname === tab.href;

            return (
              <Link
                key={tab.name}
                to={tab.href}
                className={clsx(
                  isActive
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200'
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