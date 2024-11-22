import { clsx } from 'clsx';

export default function MetricsCard({ metric }) {
  const { name, value, change, icon: Icon } = metric;
  
  const isPositiveChange = change?.startsWith('+');
  const isNegativeChange = change?.startsWith('-');
  
  return (
    <div className="card p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{name}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change && (
              <p className={clsx(
                'ml-2 text-sm font-medium',
                isPositiveChange && 'text-green-600',
                isNegativeChange && 'text-red-600',
                !isPositiveChange && !isNegativeChange && 'text-gray-600'
              )}>
                {change}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}