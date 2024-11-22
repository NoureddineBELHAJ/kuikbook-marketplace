import { Disclosure } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  HomeIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function MobileNav({ onClose }) {
  const location = useLocation();
  const { user, logout, getRoleColor } = useAuth();
  const roleColor = user ? getRoleColor() : '#7C7F86'; // Nardo Grey for public

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Activities', href: '/activities' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const roleBasedLinks = [
    {
      role: 'ADMIN',
      icon: ShieldCheckIcon,
      label: 'Admin Dashboard',
      href: '/admin'
    },
    {
      role: 'PROVIDER',
      icon: BuildingOfficeIcon,
      label: 'Provider Dashboard',
      href: '/provider'
    },
    {
      role: 'TRAVELER',
      icon: HomeIcon,
      label: 'Traveler Dashboard',
      href: '/traveler'
    }
  ];

  const handleLogout = () => {
    logout();
    onClose?.();
  };

  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 pb-3 pt-2">
        {navigation.map((item) => (
          <Disclosure.Button
            key={item.name}
            as={Link}
            to={item.href}
            className={classNames(
              location.pathname === item.href
                ? `bg-gray-50 text-${roleColor}`
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900',
              'block px-4 py-2 text-base font-medium'
            )}
            onClick={onClose}
          >
            {item.name}
          </Disclosure.Button>
        ))}

        {user ? (
          <>
            {/* Role-based Dashboard Links */}
            <div className="border-t border-gray-200 pt-4">
              {roleBasedLinks.map((link) => (
                <Disclosure.Button
                  key={link.role}
                  as={Link}
                  to={link.href}
                  className={classNames(
                    'flex items-center px-4 py-2 text-base font-medium',
                    user.role === link.role ? `text-${roleColor}` : 'text-gray-500'
                  )}
                  onClick={onClose}
                >
                  <link.icon className="mr-3 h-5 w-5" />
                  {link.label}
                </Disclosure.Button>
              ))}
            </div>

            {/* Settings & Logout */}
            <div className="border-t border-gray-200 pt-4">
              <Disclosure.Button
                as={Link}
                to="/settings"
                className="flex items-center px-4 py-2 text-base font-medium text-gray-500"
                onClick={onClose}
              >
                <Cog6ToothIcon className="mr-3 h-5 w-5" />
                Settings
              </Disclosure.Button>
              <Disclosure.Button
                as="button"
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-base font-medium text-gray-500"
              >
                <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
                Sign out
              </Disclosure.Button>
            </div>
          </>
        ) : (
          <div className="border-t border-gray-200 pt-4">
            <Disclosure.Button
              as={Link}
              to="/login"
              className="block px-4 py-2 text-base font-medium text-gray-500"
              onClick={onClose}
            >
              Log in
            </Disclosure.Button>
            <Disclosure.Button
              as={Link}
              to="/signup"
              className="block px-4 py-2 text-base font-medium text-white bg-[#7C7F86]"
              onClick={onClose}
            >
              Sign up
            </Disclosure.Button>
          </div>
        )}
      </div>
    </Disclosure.Panel>
  );
}