import { useState } from 'react';
import { 
  ShieldCheckIcon, 
  KeyIcon, 
  UserGroupIcon,
  DocumentCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function AdminSecurity() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const securityModules = [
    {
      title: 'Access Control',
      icon: KeyIcon,
      description: 'Manage user roles and permissions',
      status: 'Active',
      link: '/admin/security/access'
    },
    {
      title: 'Authentication',
      icon: UserGroupIcon,
      description: 'Configure login and identity verification settings',
      status: 'Active',
      link: '/admin/security/auth'
    },
    {
      title: 'Compliance',
      icon: DocumentCheckIcon,
      description: 'Monitor and maintain regulatory compliance',
      status: 'Active',
      link: '/admin/security/compliance'
    },
    {
      title: 'Threat Detection',
      icon: ExclamationTriangleIcon,
      description: 'View and manage security alerts',
      status: 'Active',
      link: '/admin/security/threats'
    }
  ];

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Security</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {securityModules.map((module) => (
          <div key={module.title} className="card p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <module.icon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{module.title}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {module.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{module.description}</p>
                <a
                  href={module.link}
                  className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Configure →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Security Events</h3>
        <div className="text-center py-12">
          <ShieldCheckIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No security events</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your system is secure. No suspicious activities detected.
          </p>
        </div>
      </div>
    </div>
  );
}