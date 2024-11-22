import { Link } from 'react-router-dom';
import { StarIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../hooks/useAuth';
import { useFavorites } from '../../hooks/useFavorites';
import { clsx } from 'clsx';

const COLOR_SCHEMES = {
  public: {
    primary: 'bg-public-500',
    hover: 'hover:text-public-600',
    heart: 'text-public-500'
  },
  admin: {
    primary: 'bg-admin-600',
    hover: 'hover:text-admin-600',
    heart: 'text-admin-500'
  },
  provider: {
    primary: 'bg-provider-600',
    hover: 'hover:text-provider-600',
    heart: 'text-provider-500'
  },
  traveler: {
    primary: 'bg-traveler-600',
    hover: 'hover:text-traveler-600',
    heart: 'text-traveler-500'
  }
};

export default function ActivityGrid({ activities = [], view = 'grid', colorScheme = 'public', onEdit }) {
  const { isAuthenticated } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const colors = COLOR_SCHEMES[colorScheme];

  if (!Array.isArray(activities)) {
    console.error('Activities prop must be an array');
    return null;
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-medium text-gray-900">No activities found</h3>
        <p className="mt-1 text-sm text-gray-500">
          {onEdit ? 'Start by adding your first activity' : 'Try adjusting your search or filters'}
        </p>
      </div>
    );
  }

  if (view === 'list') {
    return (
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="card group flex">
            <div className="w-48 h-48 flex-shrink-0">
              <img
                src={activity.images?.[0] || '/placeholder-activity.jpg'}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-6">
              <div className="flex justify-between">
                <h3 className={`text-lg font-semibold text-gray-900 ${colors.hover}`}>
                  <Link to={`/activities/${activity.id}`}>
                    {activity.title}
                  </Link>
                </h3>
                {isAuthenticated && (
                  <button
                    onClick={() => toggleFavorite(activity.id)}
                    className={clsx(
                      'text-gray-400 hover:text-red-500',
                      isFavorite(activity.id) && colors.heart
                    )}
                  >
                    {isFavorite(activity.id) ? (
                      <HeartSolidIcon className="h-6 w-6" />
                    ) : (
                      <HeartIcon className="h-6 w-6" />
                    )}
                  </button>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">{activity.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(activity.rating || 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    ({activity.reviewCount || 0} reviews)
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  ${activity.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {activities.map((activity) => (
        <div key={activity.id} className="card group">
          <div className="relative">
            <img
              src={activity.images?.[0] || '/placeholder-activity.jpg'}
              alt={activity.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {isAuthenticated && (
              <button
                onClick={() => toggleFavorite(activity.id)}
                className={clsx(
                  'absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100',
                  isFavorite(activity.id) && colors.heart
                )}
              >
                {isFavorite(activity.id) ? (
                  <HeartSolidIcon className="h-5 w-5" />
                ) : (
                  <HeartIcon className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
          <div className="p-6">
            <h3 className={`text-lg font-semibold text-gray-900 ${colors.hover}`}>
              <Link to={`/activities/${activity.id}`}>
                {activity.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
              {activity.description}
            </p>
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(activity.rating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                ({activity.reviewCount || 0})
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                ${activity.price}
              </span>
              {onEdit ? (
                <button
                  onClick={() => onEdit(activity)}
                  className={`btn-primary text-sm ${colors.primary}`}
                >
                  Edit
                </button>
              ) : (
                <Link
                  to={`/activities/${activity.id}`}
                  className={`btn-primary text-sm ${colors.primary}`}
                >
                  View Details
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}