import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';

export default function TravelerSaved() {
  const navigate = useNavigate();
  const [savedActivities, setSavedActivities] = useState([
    {
      id: 1,
      title: 'Mountain Hiking Adventure',
      location: 'Swiss Alps',
      price: 149,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500',
      provider: 'Alpine Adventures'
    },
    {
      id: 2,
      title: 'City Food Tour',
      location: 'Tokyo, Japan',
      price: 89,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500',
      provider: 'Tokyo Food Walks'
    },
    {
      id: 3,
      title: 'Historical Walking Tour',
      location: 'Rome, Italy',
      price: 39,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500',
      provider: 'Rome Heritage Tours'
    }
  ]);

  const handleBookNow = (activityId) => {
    // Navigate to activity details page
    navigate(`/activities/${activityId}`);
  };

  const handleRemoveSaved = (activityId) => {
    setSavedActivities(savedActivities.filter(activity => activity.id !== activityId));
  };

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Saved Activities</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {savedActivities.map((activity) => (
          <div key={activity.id} className="card group">
            <div className="relative">
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <button
                onClick={() => handleRemoveSaved(activity.id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200"
                aria-label="Remove from saved"
              >
                <HeartIcon className="h-5 w-5 text-red-500" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600">
                {activity.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{activity.provider}</p>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{activity.location}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-sm font-medium text-gray-900">
                    ★ {activity.rating}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">
                  ${activity.price}
                </span>
                <button 
                  onClick={() => handleBookNow(activity.id)}
                  className="btn-primary"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {savedActivities.length === 0 && (
        <div className="text-center py-12">
          <HeartIcon className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No saved activities</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start saving activities to your list
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="btn-primary"
              onClick={() => navigate('/activities')}
            >
              Browse Activities
            </button>
          </div>
        </div>
      )}
    </div>
  );
}