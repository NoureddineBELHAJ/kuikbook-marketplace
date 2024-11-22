import { useState } from 'react';
import { useSearch } from '../../hooks/useSearch';
import DatePicker from 'react-datepicker';
import { motion } from 'framer-motion';
import "react-datepicker/dist/react-datepicker.css";

const CATEGORIES = [
  { id: 'adventure', name: 'Adventure' },
  { id: 'cultural', name: 'Cultural' },
  { id: 'food', name: 'Food & Drink' },
  { id: 'nature', name: 'Nature' },
  { id: 'sports', name: 'Sports' },
  { id: 'wellness', name: 'Wellness' }
];

const PRICE_RANGES = [
  { id: '0-50', label: 'Under $50', min: 0, max: 50 },
  { id: '50-100', label: '$50 to $100', min: 50, max: 100 },
  { id: '100-200', label: '$100 to $200', min: 100, max: 200 },
  { id: '200+', label: '$200+', min: 200, max: null }
];

const DURATIONS = [
  { id: '0-2', label: 'Up to 2 hours' },
  { id: '2-4', label: '2-4 hours' },
  { id: '4-8', label: 'Half day (4-8 hours)' },
  { id: '8+', label: 'Full day (8+ hours)' }
];

export default function AdvancedSearch({ onSearch }) {
  const [searchParams, setSearchParams] = useState({
    query: '',
    dateRange: {
      start: null,
      end: null
    },
    priceRange: null,
    duration: '',
    participants: 1,
    categories: [],
    features: [],
    sortBy: 'relevance'
  });

  const handleCategoryToggle = (categoryId) => {
    setSearchParams(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleReset = () => {
    setSearchParams({
      query: '',
      dateRange: {
        start: null,
        end: null
      },
      priceRange: null,
      duration: '',
      participants: 1,
      categories: [],
      features: [],
      sortBy: 'relevance'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Date Range */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <DatePicker
              selected={searchParams.dateRange.start}
              onChange={date => setSearchParams(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, start: date }
              }))}
              className="input mt-1"
              minDate={new Date()}
              placeholderText="Select start date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <DatePicker
              selected={searchParams.dateRange.end}
              onChange={date => setSearchParams(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, end: date }
              }))}
              className="input mt-1"
              minDate={searchParams.dateRange.start || new Date()}
              placeholderText="Select end date"
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categories
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryToggle(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  searchParams.categories.includes(category.id)
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range and Duration */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="space-y-2">
              {PRICE_RANGES.map(range => (
                <label key={range.id} className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={searchParams.priceRange === range.id}
                    onChange={() => setSearchParams(prev => ({
                      ...prev,
                      priceRange: range.id
                    }))}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <div className="space-y-2">
              {DURATIONS.map(duration => (
                <label key={duration.id} className="flex items-center">
                  <input
                    type="radio"
                    name="duration"
                    checked={searchParams.duration === duration.id}
                    onChange={() => setSearchParams(prev => ({
                      ...prev,
                      duration: duration.id
                    }))}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">{duration.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Participants */}
        <div>
          <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
            Number of Participants
          </label>
          <input
            type="number"
            id="participants"
            min="1"
            className="input mt-1"
            value={searchParams.participants}
            onChange={(e) => setSearchParams(prev => ({
              ...prev,
              participants: parseInt(e.target.value)
            }))}
          />
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
            Sort By
          </label>
          <select
            id="sortBy"
            className="input mt-1"
            value={searchParams.sortBy}
            onChange={(e) => setSearchParams(prev => ({
              ...prev,
              sortBy: e.target.value
            }))}
          >
            <option value="relevance">Most Relevant</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="popularity">Most Popular</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary"
          >
            Reset Filters
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </motion.div>
  );
}