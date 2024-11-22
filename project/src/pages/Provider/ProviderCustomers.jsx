import { useState } from 'react';
import { useCustomers } from '../../hooks/useCustomers';
import { 
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import CustomerDetailsModal from '../../components/Provider/CustomerDetailsModal';

export default function ProviderCustomers() {
  const { getProviderCustomers } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const customers = getProviderCustomers();

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Customers</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer) => (
          <div 
            key={customer.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => setSelectedCustomer(customer)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-provider-100 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-provider-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {customer.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Customer since {new Date(customer.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {customer.status}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-500">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                {customer.email}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <PhoneIcon className="h-5 w-5 mr-2" />
                {customer.phone}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPinIcon className="h-5 w-5 mr-2" />
                {customer.location}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <ChartBarIcon className="h-5 w-5 mr-2" />
                {customer.totalBookings} bookings
              </div>
            </div>
          </div>
        ))}
      </div>

      <CustomerDetailsModal
        customer={selectedCustomer}
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
}