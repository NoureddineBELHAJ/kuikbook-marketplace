import { Link } from 'react-router-dom';
import { BuildingOfficeIcon, UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function RoleBoxes() {
  const roles = [
    {
      id: 'ADMIN',
      title: 'Administrator',
      description: 'Manage and oversee the platform',
      icon: ShieldCheckIcon,
      color: 'bg-admin-500',
      hoverColor: 'hover:bg-admin-600',
      href: '/signup?role=ADMIN'
    },
    {
      id: 'PROVIDER',
      title: 'Activity Provider',
      description: 'Share your experiences with travelers',
      icon: BuildingOfficeIcon,
      color: 'bg-provider-500',
      hoverColor: 'hover:bg-provider-600',
      href: '/signup?role=PROVIDER'
    },
    {
      id: 'TRAVELER',
      title: 'Traveler',
      description: 'Discover and book amazing experiences',
      icon: UserIcon,
      color: 'bg-traveler-500',
      hoverColor: 'hover:bg-traveler-600',
      href: '/signup?role=TRAVELER'
    }
  ];

  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose Your Role
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join our community as an administrator, provider, or traveler
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Link
                key={role.id}
                to={role.href}
                className="relative group rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-200"
              >
                <div className={`absolute top-8 right-8 p-2 rounded-lg ${role.color} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900">{role.title}</h3>
                  <p className="mt-2 text-gray-600">{role.description}</p>
                  <span className={`mt-6 inline-flex items-center text-sm font-medium ${role.color} text-white rounded-full px-4 py-2 ${role.hoverColor} transition-colors duration-200`}>
                    Get Started →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}