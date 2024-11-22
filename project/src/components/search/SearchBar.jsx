import { useState } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function SearchBar({ defaultValue = '', className = '', onSearch, onAdvancedSearch }) {
  const [query, setQuery] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
        <div className="relative flex-grow group">
          <input
            type="text"
            className={`w-full rounded-full pl-12 pr-4 py-3.5 bg-white shadow-sm border border-gray-300 
              transition-all duration-200 ease-in-out
              ${isFocused ? 'border-primary-500 ring-2 ring-primary-100 shadow-lg' : 'hover:border-gray-400'}
              focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100`}
            placeholder="Search activities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className={`h-5 w-5 transition-colors duration-200 ${isFocused ? 'text-primary-500' : 'text-gray-400'}`} />
          </div>
        </div>
        <button
          type="button"
          onClick={onAdvancedSearch}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full
            hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 mr-1.5" />
          <span className="hidden sm:inline">Advanced Search</span>
        </button>
      </form>
    </div>
  );
}