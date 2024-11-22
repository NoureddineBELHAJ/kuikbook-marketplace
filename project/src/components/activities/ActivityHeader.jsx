import { StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';

export default function ActivityHeader({ activity, isFavorite, onToggleFavorite }) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{activity.title}</h1>
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(activity.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {activity.rating} ({activity.reviewCount} reviews)
          </span>
        </div>
      </div>
      <button
        onClick={onToggleFavorite}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <HeartIcon
          className={`h-6 w-6 ${
            isFavorite ? 'text-red-500' : 'text-gray-400'
          }`}
        />
      </button>
    </div>
  );
}