import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import SearchBar from '../../components/search/SearchBar';
import SearchFilters from '../../components/search/SearchFilters';
import ActivityGrid from '../../components/activities/ActivityGrid';
import SearchSkeleton from '../../components/search/SearchSkeleton';
import AdvancedSearch from '../../components/search/AdvancedSearch';
import { MapIcon, ViewColumnsIcon, Bars3Icon } from '@heroicons/react/24/outline';

export default function TravelerActivities() {
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
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Browse Activities</h2>
      </div>

      <SearchBar 
        defaultValue={query}
        className="max-w-2xl"
        onAdvancedSearch={() => setShowAdvanced(!showAdvanced)}
      />

      {showAdvanced && (
        <div className="mt-4">
          <AdvancedSearch onSearch={searchActivities} />
        </div>
      )}

      {/* View Controls */}
      <div className="flex justify-end space-x-4">
        <div className="flex rounded-lg shadow-sm">
          <button
            onClick={() => setView('grid')}
            className={`px-4 py-2 text-sm font-medium ${
              view === 'grid' 
                ? 'bg-traveler-600 text-white' 
                : 'bg-white text-gray-700 hover:text-gray-900'
            } rounded-l-lg border border-gray-200`}
          >
            <ViewColumnsIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 text-sm font-medium ${
              view === 'list' 
                ? 'bg-traveler-600 text-white' 
                : 'bg-white text-gray-700 hover:text-gray-900'
            } border-t border-b border-gray-200`}
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowMap(!showMap)}
            className={`px-4 py-2 text-sm font-medium ${
              showMap 
                ? 'bg-traveler-600 text-white' 
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
          <ActivityGrid 
            activities={results}
            view={view}
            colorScheme="traveler"
          />
        </div>

        {/* Map View */}
        {showMap && (
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Map 
                activities={results}
                className="h-[calc(100vh-200px)] rounded-lg shadow-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}