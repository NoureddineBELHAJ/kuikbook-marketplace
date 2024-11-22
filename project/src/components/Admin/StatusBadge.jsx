import { clsx } from 'clsx';

const STATUS_STYLES = {
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-red-100 text-red-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Suspended: 'bg-gray-100 text-gray-800'
};

export default function StatusBadge({ status }) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      STATUS_STYLES[status] || 'bg-gray-100 text-gray-800'
    )}>
      {status}
    </span>
  );
}