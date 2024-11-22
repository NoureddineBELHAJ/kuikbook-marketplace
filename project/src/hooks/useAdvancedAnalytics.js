import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format, subDays, subMonths } from 'date-fns';
import { useAuth } from './useAuth';

export function useAdvancedAnalytics() {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState({
    start: subDays(new Date(), 30),
    end: new Date()
  });

  const fetchAnalytics = useCallback(async () => {
    const { data } = await axios.get('/api/analytics', {
      params: {
        startDate: format(dateRange.start, 'yyyy-MM-dd'),
        endDate: format(dateRange.end, 'yyyy-MM-dd'),
        userId: user?.id,
        role: user?.role
      }
    });
    return data;
  }, [dateRange, user]);

  const { data, isLoading, error } = useQuery(
    ['analytics', dateRange, user?.id],
    fetchAnalytics,
    {
      enabled: !!user,
      refetchInterval: 300000, // 5 minutes
      staleTime: 240000 // 4 minutes
    }
  );

  const generateReport = async (reportType) => {
    const { data } = await axios.post('/api/analytics/report', {
      type: reportType,
      startDate: format(dateRange.start, 'yyyy-MM-dd'),
      endDate: format(dateRange.end, 'yyyy-MM-dd'),
      userId: user?.id,
      role: user?.role
    });
    return data;
  };

  const getMetricTrend = useCallback((metric, period = 'month') => {
    if (!data?.trends?.[metric]) return null;

    const previousPeriod = data.trends[metric].previous;
    const currentPeriod = data.trends[metric].current;
    
    const percentageChange = ((currentPeriod - previousPeriod) / previousPeriod) * 100;
    
    return {
      current: currentPeriod,
      previous: previousPeriod,
      change: percentageChange.toFixed(1),
      trend: percentageChange > 0 ? 'up' : 'down'
    };
  }, [data]);

  return {
    data,
    isLoading,
    error,
    setDateRange,
    generateReport,
    getMetricTrend
  };
}