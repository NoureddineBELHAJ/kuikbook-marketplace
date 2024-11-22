import { useState } from 'react';
import { 
  BanknotesIcon, 
  ArrowTrendingUpIcon,
  CreditCardIcon,
  CalculatorIcon 
} from '@heroicons/react/24/outline';
import { useReports } from '../../../hooks/useReports';
import MetricsCard from '../../../components/Admin/MetricsCard';

export default function RevenueReport() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const { getReport } = useReports();
  const report = getReport('revenue', selectedPeriod);

  const metrics = [
    {
      name: 'Total Revenue',
      value: `$${report.total.toLocaleString()}`,
      change: '+18%',
      icon: BanknotesIcon
    },
    {
      name: 'Average Order Value',
      value: `$${report.avgOrderValue.toFixed(2)}`,
      change: '+5%',
      icon: CalculatorIcon
    },
    {
      name: 'Transaction Volume',
      value: report.transactionVolume.toLocaleString(),
      change: '+12%',
      icon: CreditCardIcon
    },
    {
      name: 'Growth Rate',
      value: `${report.growthRate}%`,
      change: '+2.3%',
      icon: ArrowTrendingUpIcon
    }
  ];

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Revenue Report</h2>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="input"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricsCard key={metric.name} metric={metric} />
        ))}
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trends</h3>
        <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart visualization will be displayed here</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue by Activity Type</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Adventure Activities</span>
              <span className="text-sm font-medium text-gray-900">${report.byType.adventure.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Cultural Experiences</span>
              <span className="text-sm font-medium text-gray-900">${report.byType.cultural.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Food & Dining</span>
              <span className="text-sm font-medium text-gray-900">${report.byType.food.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Credit Card</span>
              <span className="text-sm font-medium text-gray-900">{report.paymentMethods.creditCard}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Digital Wallet</span>
              <span className="text-sm font-medium text-gray-900">{report.paymentMethods.digitalWallet}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Bank Transfer</span>
              <span className="text-sm font-medium text-gray-900">{report.paymentMethods.bankTransfer}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}