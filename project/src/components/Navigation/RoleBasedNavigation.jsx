import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { useAuth } from '../../hooks/useAuth';

// Define navigation items per role
const ROLE_NAVIGATION = {
  ADMIN: [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Users', href: '/admin/users' },
    { name: 'Activities', href: '/admin/activities' },
    { name: 'Bookings', href: '/admin/bookings' },
    { name: 'Reviews', href: '/admin/reviews' },
    { name: 'Settings', href: '/admin/settings' }
  ],
  PROVIDER: [
    { name: 'Dashboard', href: '/provider' },
    { name: 'Activities', href: '/provider/activities' },
    { name: 'Bookings', href: '/provider/bookings' },
    { name: 'Earnings', href: '/provider/earnings' },
    { name: 'Reviews', href: '/provider/reviews' },
    { name: 'Settings', href: '/provider/settings' }
  ],
  TRAVELER: [
    { name: 'Dashboard', href: '/traveler' },
    { name: 'My Bookings', href: '/traveler/bookings' },
    { name: 'Saved', href: '/traveler/saved' },
    { name: 'Reviews', href: '/traveler/reviews' },
    { name: 'Favorites', href: '/traveler/favorites' },
    { name: 'Settings', href: '/traveler/settings' }
  ]
};

export default function RoleBasedNavigation() {
  const location = useLocation();
  const { user, currentRole, getRoleName, getRoleColor } = useAuth();

  if (!user?.role || !currentRole) return null;

  const navigation = ROLE_NAVIGATION[currentRole];
  if (!navigation) return null;
  
  const roleName = getRoleName();
  const roleColor = getRoleColor();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <h2 className="text-sm font-medium text-gray-500">{roleName} Portal</h2>
        </div>
        <nav className="-mb-px flex space-x-8" aria-label={`${roleName} Navigation`}>
          {navigation.map((item) => {
            const isActive = 
              item.href === `/${currentRole.toLowerCase()}` 
                ? location.pathname === item.href
                : location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
                  isActive
                    ? 'text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
                style={{
                  borderColor: isActive ? roleColor : 'transparent',
                  color: isActive ? roleColor : undefined
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}