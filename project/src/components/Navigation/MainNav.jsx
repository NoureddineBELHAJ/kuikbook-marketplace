import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { clsx } from 'clsx';

export default function MainNav() {
  const location = useLocation();
  const { user, getRoleColor } = useAuth();
  const roleColor = user ? getRoleColor() : '#7C7F86'; // Nardo Grey for public

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Activities', href: '/activities' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  // Only add dashboard link if user is authenticated and has a role
  const dashboardLink = user?.currentRole ? {
    name: 'Dashboard',
    href: `/${user.currentRole.toLowerCase()}`
  } : null;

  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={clsx(
            'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
            location.pathname === item.href
              ? `text-${roleColor} bg-gray-50`
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          )}
        >
          {item.name}
        </Link>
      ))}

      {dashboardLink && (
        <Link
          to={dashboardLink.href}
          className={clsx(
            'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
            location.pathname.startsWith(dashboardLink.href)
              ? `text-${roleColor} bg-gray-50`
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          )}
        >
          {dashboardLink.name}
        </Link>
      )}
    </div>
  );
}