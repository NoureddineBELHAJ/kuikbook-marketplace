import { useSearch } from '../../hooks/useSearch';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { MapPinIcon } from '@heroicons/react/24/outline';

export default function SearchResults() {
  const { 
    results, 
    isLoading, 
    totalResults,
    currentPage,
    totalPages,
    searchActivities
  } = useSearch();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No results found</h3>
        <p className="mt-2 text-gray-500">
          Try adjusting your search or filters to find what you're looking for
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">
        Showing {results.length} of {totalResults} results
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((activity) => (
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
              
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {activity.location.name}
              </div>

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

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          <button
            onClick={() => searchActivities(null, currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="btn-secondary"
          >
            Previous
          </button>
          <button
            onClick={() => searchActivities(null, currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className="btn-secondary"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}