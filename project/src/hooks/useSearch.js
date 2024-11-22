import { useState } from 'react';
import { activitiesApi } from '../services/api/activities';
import toast from 'react-hot-toast';

export function useSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const searchActivities = async (params) => {
    setIsLoading(true);
    try {
      const data = await activitiesApi.getAll({
        ...params,
        page: currentPage
      });
      setResults(data.activities);
      setTotalResults(data.total);
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Search failed');
      return { activities: [], total: 0 };
    } finally {
      setIsLoading(false);
    }
  };

  const setPage = (page) => {
    setCurrentPage(page);
  };

  return {
    isLoading,
    error,
    results,
    totalResults,
    currentPage,
    searchActivities,
    setPage
  };
}