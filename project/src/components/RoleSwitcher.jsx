import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheckIcon,
  BuildingOfficeIcon,
  UserIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const ROLE_ICONS = {
  ADMIN: ShieldCheckIcon,
  PROVIDER: BuildingOfficeIcon,
  TRAVELER: UserIcon
};

export default function RoleSwitcher() {
  const { user, currentRole, getAllRoles, switchRole, getRoleColor } = useAuth();
  const navigate = useNavigate();
  const availableRoles = getAllRoles();
  const roleColor = getRoleColor();

  if (!user || availableRoles.length <= 1) return null;

  const handleRoleSwitch = async (role) => {
    try {
      await switchRole(role.id);
      navigate(`/${role.id.toLowerCase()}`);
    } catch (error) {
      console.error('Failed to switch role:', error);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button 
          className="inline-flex items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset"
          style={{ 
            backgroundColor: `${roleColor}10`,
            color: roleColor,
            borderColor: roleColor
          }}
        >
          {currentRole}
          <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {availableRoles.map((role) => {
              const Icon = ROLE_ICONS[role.id];
              return (
                <Menu.Item key={role.id}>
                  {({ active }) => (
                    <button
                      onClick={() => handleRoleSwitch(role)}
                      className={`${
                        active ? 'bg-gray-50' : ''
                      } ${
                        currentRole === role.id ? 'text-primary-600' : 'text-gray-700'
                      } group flex items-center px-4 py-2 text-sm w-full`}
                    >
                      <Icon className="mr-3 h-5 w-5" aria-hidden="true" />
                      {role.name}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}