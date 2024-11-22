import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import { StarIcon } from '@heroicons/react/24/solid';

export default function Recommendations({ activityId }) {
  const { getRecommendations } = useSearch();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const data = await getRecommendations(activityId);
      setRecommendations(data);
    };

    fetchRecommendations();
  }, [activityId, getRecommendations]);

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        You might also like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((activity) => (
          <Link
            key={activity.id}
            to={`/activities/${activity.id}`}
            className="card group hover:shadow-md transition-shadow duration-200"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={activity.images[0]}
                alt={activity.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600">
                {activity.title}
              </h3>
              
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(activity.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  ({activity.reviewCount})
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  ${activity.price}
                </span>
                <span className="text-sm text-gray-500">
                  {activity.duration} hours
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}