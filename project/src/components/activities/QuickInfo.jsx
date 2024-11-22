import { ClockIcon, UserGroupIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function QuickInfo({ activity }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="flex items-center space-x-2">
        <ClockIcon className="h-5 w-5 text-gray-400" />
        <span className="text-sm text-gray-600">{activity.duration} hours</span>
      </div>
      <div className="flex items-center space-x-2">
        <UserGroupIcon className="h-5 w-5 text-gray-400" />
        <span className="text-sm text-gray-600">Up to {activity.maxParticipants} people</span>
      </div>
      <div className="flex items-center space-x-2">
        <MapPinIcon className="h-5 w-5 text-gray-400" />
        <span className="text-sm text-gray-600">{activity.location.name}</span>
      </div>
      <div className="flex items-center space-x-2">
        <CalendarIcon className="h-5 w-5 text-gray-400" />
        <span className="text-sm text-gray-600">Available daily</span>
      </div>
    </div>
  );
}