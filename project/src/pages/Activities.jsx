import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import SearchBar from '../components/search/SearchBar';
import SearchFilters from '../components/search/SearchFilters';
import ActivityGrid from '../components/activities/ActivityGrid';
import SearchSkeleton from '../components/search/SearchSkeleton';
import AdvancedSearch from '../components/search/AdvancedSearch';
import { MapIcon, ViewColumnsIcon, Bars3Icon } from '@heroicons/react/24/outline';

export default function Activities() {
  const [searchParams] = useSearchParams();
  const { searchActivities, isLoading, results, totalResults, error } = useSearch();
  const [view, setView] = useState('grid');
  const [showMap, setShowMap] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const query = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    searchActivities({ query, category });
  }, [query, category]);

  if (isLoading) {
    return <SearchSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {query ? `Search results for "${query}"` : 'Browse Activities'}
        </h1>
        <div className="mt-6">
          <SearchBar 
            defaultValue={query}
            className="max-w-2xl"
            onAdvancedSearch={() => setShowAdvanced(!showAdvanced)}
          />
        </div>
      </div>

      {showAdvanced && (
        <div className="mb-8">
          <AdvancedSearch onSearch={searchActivities} />
        </div>
      )}

      {/* View Controls */}
      <div className="flex justify-end space-x-4 mb-6">
        <div className="flex rounded-lg shadow-sm">
          <button
            onClick={() => setView('grid')}
            className={`px-4 py-2 text-sm font-medium ${
              view === 'grid' 
                ? 'bg-public-500 text-white' 
                : 'bg-white text-gray-700 hover:text-gray-900'
            } rounded-l-lg border border-gray-200`}
          >
            <ViewColumnsIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 text-sm font-medium ${
              view === 'list' 
                ? 'bg-public-500 text-white' 
                : 'bg-white text-gray-700 hover:text-gray-900'
            } border-t border-b border-gray-200`}
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowMap(!showMap)}
            className={`px-4 py-2 text-sm font-medium ${
              showMap 
                ? 'bg-public-500 text-white' 
                : 'bg-white text-gray-700 hover:text-gray-900'
            } rounded-r-lg border border-gray-200`}
          >
            <MapIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Filters */}
        <div className="hidden lg:block lg:col-span-1">
          <SearchFilters />
        </div>

        {/* Results */}
        <div className={`lg:col-span-${showMap ? '2' : '3'}`}>
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">
              {totalResults} {totalResults === 1 ? 'result' : 'results'}
            </p>
          </div>

          {error ? (
            <div className="text-center py-12">
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={() => searchActivities({ query, category })}
                className="mt-4 btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : (
            <ActivityGrid 
              activities={results}
              view={view}
              colorScheme="public"
            />
          )}
        </div>

        {/* Map View */}
        {showMap && (
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-[calc(100vh-200px)]">
                  <Map 
                    activities={results}
                    onMarkerClick={(activityId) => {
                      // Handle marker click
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}