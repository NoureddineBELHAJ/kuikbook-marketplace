import { StarIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';

export default function TravelerReviews() {
  const reviews = [
    {
      id: 1,
      activity: 'Desert Safari Adventure',
      location: 'Dubai, UAE',
      rating: 5,
      comment: 'Amazing experience! The guide was very knowledgeable and friendly.',
      date: '2023-12-01'
    },
    {
      id: 2,
      activity: 'City Walking Tour',
      location: 'Rome, Italy',
      rating: 4,
      comment: 'Great tour with lots of interesting historical information.',
      date: '2023-11-15'
    },
    {
      id: 3,
      activity: 'Cooking Class',
      location: 'Paris, France',
      rating: 5,
      comment: 'Learned so much about French cuisine. Highly recommended!',
      date: '2023-11-01'
    }
  ];

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">My Reviews</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="card p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{review.activity}</h3>
                <p className="text-sm text-gray-500">{review.location}</p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={clsx(
                        'h-5 w-5',
                        i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                      )}
                    />
                  ))}
                </div>
                <p className="mt-2 text-gray-600">{review.comment}</p>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button className="text-sm text-primary-600 hover:text-primary-900">
                Edit
              </button>
              <button className="text-sm text-red-600 hover:text-red-900">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}