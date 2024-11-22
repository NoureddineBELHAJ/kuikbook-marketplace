export default function ProfileSaved() {
  const savedActivities = [
    {
      id: 1,
      title: 'Mountain Hiking Adventure',
      location: 'Swiss Alps',
      price: 149,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500',
    },
    {
      id: 2,
      title: 'City Food Tour',
      location: 'Tokyo, Japan',
      price: 89,
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500',
    },
  ];

  return (
    <div className="space-y-6 animate-enter">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {savedActivities.map((activity) => (
          <div key={activity.id} className="card group">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600">
                {activity.title}
              </h3>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">{activity.location}</span>
                <span className="text-lg font-bold text-gray-900">
                  ${activity.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}