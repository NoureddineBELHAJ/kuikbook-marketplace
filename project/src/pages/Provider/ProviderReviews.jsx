import { StarIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';

export default function ProviderReviews() {
  const reviews = [
    {
      id: 1,
      activity: 'Desert Safari Adventure',
      customer: 'John Smith',
      rating: 5,
      comment: 'Amazing experience! The guide was very knowledgeable.',
      date: '2023-12-10'
    },
    {
      id: 2,
      activity: 'City Walking Tour',
      customer: 'Mary Johnson',
      rating: 4,
      comment: 'Great tour, but a bit long for some participants.',
      date: '2023-12-08'
    },
    {
      id: 3,
      activity: 'Cooking Workshop',
      customer: 'Robert Brown',
      rating: 5,
      comment: 'Learned so much! Can\'t wait to try these recipes at home.',
      date: '2023-12-05'
    }
  ];

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Reviews</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="card p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{review.activity}</h3>
                <p className="text-sm text-gray-500">by {review.customer}</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={clsx(
                        'h-4 w-4',
                        i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                      )}
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="text-sm text-provider-600 hover:text-provider-900">
                Respond
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}