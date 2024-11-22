import { 
  CalendarIcon,
  MapPinIcon,
  StarIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const ICONS = {
  calendar: CalendarIcon,
  location: MapPinIcon,
  star: StarIcon,
  heart: HeartIcon
};

export default function StatCard({ title, value, icon, trend }) {
  const Icon = typeof icon === 'string' ? ICONS[icon] : icon;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        {Icon && (
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
        )}
        <div className={Icon ? 'ml-4' : ''}>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {trend && (
              <p className={`ml-2 text-sm font-medium ${
                trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}