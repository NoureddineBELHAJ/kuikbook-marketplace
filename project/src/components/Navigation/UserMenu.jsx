import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  BuildingOfficeIcon,
  HomeIcon,
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function UserMenu() {
  const { 
    user, 
    logout,
    getRoleColor,
    getRoleName
  } = useAuth();
  
  const navigate = useNavigate();
  const roleColor = getRoleColor();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
        >
          Log in
        </Link>
        <Link
          to="/signup"
          className="px-3 py-2 rounded-md text-white text-sm font-medium bg-[#7C7F86] hover:bg-[#6C6F75]"
        >
          Sign up
        </Link>
      </div>
    );
  }

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

  return (
    <Menu as="div" className="relative ml-3">
      <Menu.Button 
        className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
        style={{ 
          '--ring-color': roleColor,
          '--focus-ring-color': roleColor 
        }}
      >
        <span className="sr-only">Open user menu</span>
        <div 
          className="h-8 w-8 rounded-full text-white flex items-center justify-center font-medium"
          style={{ backgroundColor: roleColor }}
        >
          {user.initials || user.email[0].toUpperCase()}
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{user.name || user.email}</p>
            <p className="text-xs text-gray-500">{getRoleName()}</p>
          </div>

          {/* Role-based Dashboard Links */}
          <div className="py-1">
            {roleBasedLinks.map((link) => (
              <Menu.Item key={link.role}>
                {({ active }) => (
                  <Link
                    to={link.href}
                    className={`flex items-center px-4 py-2 text-sm ${
                      active ? 'bg-gray-50' : ''
                    } ${user.role === link.role ? 'text-primary-600' : 'text-gray-700'}`}
                  >
                    <link.icon className="mr-3 h-5 w-5" />
                    {link.label}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>

          {/* Switch Role Links */}
          <div className="py-1 border-t border-gray-200">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/signup?role=PROVIDER"
                  className={`flex items-center px-4 py-2 text-sm ${
                    active ? 'bg-gray-50' : ''
                  } text-gray-700`}
                >
                  <BuildingOfficeIcon className="mr-3 h-5 w-5" />
                  Become a Provider
                </Link>
              )}
            </Menu.Item>
          </div>

          {/* Settings & Logout */}
          <div className="py-1 border-t border-gray-200">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/settings"
                  className={`flex items-center px-4 py-2 text-sm ${
                    active ? 'bg-gray-50' : ''
                  } text-gray-700`}
                >
                  <Cog6ToothIcon className="mr-3 h-5 w-5" />
                  Settings
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`flex w-full items-center px-4 py-2 text-sm ${
                    active ? 'bg-gray-50' : ''
                  } text-gray-700`}
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}