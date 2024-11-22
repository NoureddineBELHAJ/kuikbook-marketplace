import { Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useNotifications } from '../../hooks/useNotifications';

export default function NotificationCenter() {
  const { 
    notifications, 
    getNotifications, 
    markAsRead,
    deleteNotification 
  } = useNotifications();

  useEffect(() => {
    getNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative p-2 text-gray-400 hover:text-gray-500">
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {notifications.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <Menu.Item key={notification.id}>
                {({ active }) => (
                  <div
                    className={`${
                      active ? 'bg-gray-50' : ''
                    } px-4 py-3 border-b border-gray-200 last:border-0`}
                    onMouseEnter={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Delete</span>
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </Menu.Item>
            ))
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}