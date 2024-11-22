import { clsx } from 'clsx';

const TYPE_STYLES = {
  CORPORATE: 'bg-blue-100 text-blue-800',
  INDIVIDUAL: 'bg-green-100 text-green-800'
};

export default function UserTypeChip({ userType }) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      TYPE_STYLES[userType] || 'bg-gray-100 text-gray-800'
    )}>
      {userType}
    </span>
  );
}