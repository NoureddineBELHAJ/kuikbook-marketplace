import { useState } from 'react';
import { useSearch } from '../../hooks/useSearch';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/outline';

const CATEGORIES = [
  { id: 'adventure', name: 'Adventure' },
  { id: 'cultural', name: 'Cultural' },
  { id: 'food', name: 'Food & Drink' },
  { id: 'nature', name: 'Nature' },
  { id: 'sports', name: 'Sports' },
  { id: 'wellness', name: 'Wellness' }
];

const PRICE_RANGES = [
  { id: '0-50', name: 'Under $50' },
  { id: '50-100', name: '$50 to $100' },
  { id: '100-200', name: '$100 to $200' },
  { id: '200+', name: '$200+' }
];

export default function SearchFilters() {
  const { filters, updateFilters } = useSearch();
  const [expanded, setExpanded] = useState({
    categories: true,
    price: true,
    rating: true,
    location: true
  });

  const handleFilterChange = (type, value) => {
    updateFilters({ [type]: value });
  };

  const toggleSection = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <button
          className="flex items-center justify-between w-full text-left"
          onClick={() => toggleSection('categories')}
        >
          <h3 className="text-sm font-medium text-gray-900">Categories</h3>
          <span className="text-gray-500">{expanded.categories ? '−' : '+'}</span>
        </button>
        {expanded.categories && (
          <div className="mt-4 space-y-2">
            {CATEGORIES.map(category => (
              <label key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(category.id)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...(filters.categories || []), category.id]
                      : (filters.categories || []).filter(id => id !== category.id);
                    handleFilterChange('categories', newCategories);
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">{category.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <button
          className="flex items-center justify-between w-full text-left"
          onClick={() => toggleSection('price')}
        >
          <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
          <span className="text-gray-500">{expanded.price ? '−' : '+'}</span>
        </button>
        {expanded.price && (
          <div className="mt-4 space-y-2">
            {PRICE_RANGES.map(range => (
              <label key={range.id} className="flex items-center">
                <input
                  type="radio"
                  checked={filters.priceRange === range.id}
                  onChange={() => handleFilterChange('priceRange', range.id)}
                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">{range.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div>
        <button
          className="flex items-center justify-between w-full text-left"
          onClick={() => toggleSection('rating')}
        >
          <h3 className="text-sm font-medium text-gray-900">Rating</h3>
          <span className="text-gray-500">{expanded.rating ? '−' : '+'}</span>
        </button>
        {expanded.rating && (
          <div className="mt-4 space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  checked={filters.rating === rating}
                  onChange={() => handleFilterChange('rating', rating)}
                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 flex items-center text-sm text-gray-600">
                  {rating}+ <StarIcon className="h-4 w-4 text-yellow-400 ml-1" />
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location */}
      <div>
        <button
          className="flex items-center justify-between w-full text-left"
          onClick={() => toggleSection('location')}
        >
          <h3 className="text-sm font-medium text-gray-900">Location</h3>
          <span className="text-gray-500">{expanded.location ? '−' : '+'}</span>
        </button>
        {expanded.location && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                Within {filters.distance || 10} km
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={filters.distance || 10}
              onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 km</span>
              <span>50 km</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}