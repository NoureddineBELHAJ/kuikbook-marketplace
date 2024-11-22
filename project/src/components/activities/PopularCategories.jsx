import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'adventure',
    name: 'Adventure',
    image: 'https://images.unsplash.com/photo-1533692328991-08159ff19fca?w=500',
    count: 120
  },
  {
    id: 'cultural',
    name: 'Cultural',
    image: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=500',
    count: 85
  },
  {
    id: 'food',
    name: 'Food & Drink',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500',
    count: 95
  },
  {
    id: 'nature',
    name: 'Nature',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500',
    count: 110
  }
];

export default function PopularCategories() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Categories</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/activities?category=${category.id}`}
            className="group relative overflow-hidden rounded-lg"
          >
            <div className="aspect-w-3 aspect-h-2">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xl font-semibold text-white">{category.name}</p>
                <p className="mt-1 text-sm text-white/80">{category.count} activities</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}