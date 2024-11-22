import { useState } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { ChartBarIcon, TableCellsIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const METRICS = [
  { id: 'bookings', name: 'Bookings' },
  { id: 'revenue', name: 'Revenue' },
  { id: 'users', name: 'Users' },
  { id: 'activities', name: 'Activities' },
  { id: 'reviews', name: 'Reviews' }
];

const DIMENSIONS = [
  { id: 'date', name: 'Date' },
  { id: 'category', name: 'Category' },
  { id: 'location', name: 'Location' },
  { id: 'provider', name: 'Provider' }
];

export default function ReportBuilder() {
  const { getCustomReport, exportReport, isLoading } = useAnalytics();
  const [reportConfig, setReportConfig] = useState({
    metrics: [],
    dimensions: [],
    dateRange: {
      startDate: new Date(),
      endDate: new Date()
    },
    filters: {}
  });
  const [reportData, setReportData] = useState(null);
  const [viewType, setViewType] = useState('table');

  const handleMetricToggle = (metricId) => {
    setReportConfig(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metricId)
        ? prev.metrics.filter(id => id !== metricId)
        : [...prev.metrics, metricId]
    }));
  };

  const handleDimensionToggle = (dimensionId) => {
    setReportConfig(prev => ({
      ...prev,
      dimensions: prev.dimensions.includes(dimensionId)
        ? prev.dimensions.filter(id => id !== dimensionId)
        : [...prev.dimensions, dimensionId]
    }));
  };

  const handleGenerateReport = async () => {
    const data = await getCustomReport(
      reportConfig.metrics,
      reportConfig.filters,
      reportConfig.dateRange
    );
    setReportData(data);
  };

  const handleExport = async (format) => {
    await exportReport(reportConfig, format);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Custom Report Builder</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewType('table')}
            className={`p-2 rounded-md ${
              viewType === 'table' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'
            }`}
          >
            <TableCellsIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewType('chart')}
            className={`p-2 rounded-md ${
              viewType === 'chart' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'
            }`}
          >
            <ChartBarIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Metrics Selection */}
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Metrics</h3>
          <div className="space-y-2">
            {METRICS.map(metric => (
              <label key={metric.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={reportConfig.metrics.includes(metric.id)}
                  onChange={() => handleMetricToggle(metric.id)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">{metric.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dimensions Selection */}
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Dimensions</h3>
          <div className="space-y-2">
            {DIMENSIONS.map(dimension => (
              <label key={dimension.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={reportConfig.dimensions.includes(dimension.id)}
                  onChange={() => handleDimensionToggle(dimension.id)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600">{dimension.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Date Range */}
      <div className="card p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Date Range</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700">Start Date</label>
            <DatePicker
              selected={reportConfig.dateRange.startDate}
              onChange={date => setReportConfig(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, startDate: date }
              }))}
              className="input mt-1"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">End Date</label>
            <DatePicker
              selected={reportConfig.dateRange.endDate}
              onChange={date => setReportConfig(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, endDate: date }
              }))}
              className="input mt-1"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={handleGenerateReport}
          disabled={isLoading || reportConfig.metrics.length === 0}
          className="btn-primary"
        >
          {isLoading ? 'Generating...' : 'Generate Report'}
        </button>

        <div className="flex space-x-2">
          <button
            onClick={() => handleExport('csv')}
            disabled={!reportData || isLoading}
            className="btn-secondary inline-flex items-center"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => handleExport('xlsx')}
            disabled={!reportData || isLoading}
            className="btn-secondary inline-flex items-center"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Report Display */}
      {reportData && (
        <div className="card p-6">
          {viewType === 'table' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {reportConfig.dimensions.map(dimension => (
                      <th
                        key={dimension}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {DIMENSIONS.find(d => d.id === dimension)?.name}
                      </th>
                    ))}
                    {reportConfig.metrics.map(metric => (
                      <th
                        key={metric}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {METRICS.find(m => m.id === metric)?.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.rows.map((row, i) => (
                    <tr key={i}>
                      {reportConfig.dimensions.map(dimension => (
                        <td key={dimension} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {row[dimension]}
                        </td>
                      ))}
                      {reportConfig.metrics.map(metric => (
                        <td key={metric} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {row[metric]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="h-96">
              {/* Chart visualization will be implemented here */}
              <p className="text-center text-gray-500">Chart visualization coming soon</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}