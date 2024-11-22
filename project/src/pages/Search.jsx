import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import SearchBar from '../components/search/SearchBar';
import SearchFilters from '../components/search/SearchFilters';
import SearchResults from '../components/search/SearchResults';
import Recommendations from '../components/search/Recommendations';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { searchActivities } = useSearch();

  useEffect(() => {
    if (query) {
      searchActivities(query);
    }
  }, [query, searchActivities]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <SearchBar className="max-w-2xl mx-auto" />
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Filters */}
        <div className="hidden lg:block lg:col-span-1">
          <SearchFilters />
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <SearchResults />
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-12">
        <Recommendations />
      </div>
    </div>
  );
}