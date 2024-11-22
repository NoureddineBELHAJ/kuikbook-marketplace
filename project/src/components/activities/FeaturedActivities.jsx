import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

const featuredActivities = [
  {
    id: 1,
    title: 'Desert Safari Adventure',
    description: 'Experience the thrill of dune bashing and enjoy a traditional dinner',
    price: 99,
    rating: 4.8,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=500',
    location: 'Dubai, UAE'
  },
  {
    id: 2,
    title: 'Cooking Class in Rome',
    description: 'Learn to make authentic Italian pasta from local chefs',
    price: 79,
    rating: 4.9,
    reviewCount: 96,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500',
    location: 'Rome, Italy'
  },
  {
    id: 3,
    title: 'Snorkeling Tour',
    description: 'Discover vibrant coral reefs and tropical fish',
    price: 65,
    rating: 4.7,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500',
    location: 'Bali, Indonesia'
  }
];

export default function FeaturedActivities() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Activities</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredActivities.map((activity) => (
          <Link
            key={activity.id}
            to={`/activities/${activity.id}`}
            className="card group hover:shadow-lg transition-shadow duration-200"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                {activity.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{activity.description}</p>
              <div className="mt-4 flex items-center">
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
                  {activity.location}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}