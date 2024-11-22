import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function ProfileHeader({ user }) {
  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            {user?.avatar ? (
              <img
                className="h-16 w-16 rounded-full"
                src={user.avatar}
                alt={user.name}
              />
            ) : (
              <UserCircleIcon className="h-16 w-16 text-gray-300" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}