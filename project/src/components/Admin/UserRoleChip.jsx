import { clsx } from 'clsx';

const ROLE_STYLES = {
  ADMIN: 'bg-purple-100 text-purple-800',
  PROVIDER: 'bg-blue-100 text-blue-800',
  TRAVELER: 'bg-green-100 text-green-800'
};

export default function UserRoleChip({ role }) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      ROLE_STYLES[role] || 'bg-gray-100 text-gray-800'
    )}>
      {role}
    </span>
  );
}