import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';

export default function TravelerHeader() {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">My Travel Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Welcome, {user?.name}</span>
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-500"
              aria-label="Settings"
            >
              <Cog6ToothIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}