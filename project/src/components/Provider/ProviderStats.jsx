import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';

export default function ProviderStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <stat.icon className="h-6 w-6 text-provider-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                {stat.change && (
                  <p className={clsx(
                    'ml-2 text-sm font-medium',
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  )}>
                    <span className="flex items-center">
                      {stat.change.startsWith('+') ? (
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                      )}
                      {stat.change}
                    </span>
                  </p>
                )}
              </div>
              {stat.description && (
                <p className="mt-1 text-sm text-gray-500">{stat.description}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}