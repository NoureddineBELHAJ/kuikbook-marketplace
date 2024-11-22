import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import SearchBar from '../../components/search/SearchBar';
import SearchFilters from '../../components/search/SearchFilters';
import ActivityGrid from '../../components/activities/ActivityGrid';
import SearchSkeleton from '../../components/search/SearchSkeleton';
import AdvancedSearch from '../../components/search/AdvancedSearch';
import { MapIcon, ViewColumnsIcon, Bars3Icon } from '@heroicons/react/24/outline';
import Map from '../../components/maps/Map';

export default function AdminActivities() {
  const [searchParams] = useSearchParams();
  const { searchActivities, isLoading, results, totalResults, error } = useSearch();
  const [view, setView] = useState('grid');
  const [showMap, setShowMap] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const query = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    searchActivities({ query, category });
  }, [query, category, searchActivities]);

  if (isLoading) {
    return <SearchSkeleton />;
  }

  return (
    <div className="space-y-6 animate-enter">
      {/* Rest of the component remains the same */}
    </div>
  );
}