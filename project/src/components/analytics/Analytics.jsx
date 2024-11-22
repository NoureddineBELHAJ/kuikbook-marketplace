import { useAdvancedAnalytics } from '../../hooks/useAdvancedAnalytics';
import { Line, Bar } from 'react-chartjs-2';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

export default function Analytics() {
  const { data, isLoading, error } = useAdvancedAnalytics();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trends</h3>
          <div className="h-80">
            <Line
              data={data.revenueTrends}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Distribution</h3>
          <div className="h-80">
            <Bar
              data={data.bookingDistribution}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}