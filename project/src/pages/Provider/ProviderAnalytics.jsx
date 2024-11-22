import { useState } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import PerformanceDashboard from '../../components/analytics/PerformanceDashboard';
import ReportBuilder from '../../components/analytics/ReportBuilder';
import AutomatedReports from '../../components/analytics/AutomatedReports';

export default function ProviderAnalytics() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { getPerformanceMetrics } = useAnalytics();

  const tabs = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'reports', name: 'Reports' },
    { id: 'automated', name: 'Automated Reports' }
  ];

  return (
    <div className="space-y-6 animate-enter">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-provider-600 text-provider-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && (
        <PerformanceDashboard />
      )}

      {activeTab === 'reports' && (
        <ReportBuilder />
      )}

      {activeTab === 'automated' && (
        <AutomatedReports />
      )}
    </div>
  );
}