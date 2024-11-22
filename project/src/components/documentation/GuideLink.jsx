import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function GuideLink({ title, path, className = '' }) {
  return (
    <a
      href={path}
      download
      className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${className}`}
    >
      <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
      {title}
    </a>
  );
}