import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function ProviderSettings() {
  const { user, updateProfile } = useAuth();
  const [settings, setSettings] = useState({
    businessName: user?.businessName || '',
    contactEmail: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    description: user?.description || '',
    autoAcceptBookings: user?.autoAcceptBookings || false,
    instantNotifications: user?.instantNotifications || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update user profile with new settings
    updateProfile({
      ...user,
      businessName: settings.businessName,
      email: settings.contactEmail,
      phone: settings.phone,
      address: settings.address,
      description: settings.description,
      autoAcceptBookings: settings.autoAcceptBookings,
      instantNotifications: settings.instantNotifications,
      updatedAt: new Date().toISOString()
    });

    // Show success message
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 animate-enter">
      <div className="card">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Provider Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  className="input mt-1"
                  value={settings.businessName}
                  onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  className="input mt-1"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="input mt-1"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Business Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="input mt-1"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Business Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="input mt-1"
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoAcceptBookings"
                  className="h-4 w-4 rounded border-gray-300 text-provider-600 focus:ring-provider-500"
                  checked={settings.autoAcceptBookings}
                  onChange={(e) => setSettings({ ...settings, autoAcceptBookings: e.target.checked })}
                />
                <label htmlFor="autoAcceptBookings" className="ml-2 block text-sm text-gray-700">
                  Automatically accept bookings
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="instantNotifications"
                  className="h-4 w-4 rounded border-gray-300 text-provider-600 focus:ring-provider-500"
                  checked={settings.instantNotifications}
                  onChange={(e) => setSettings({ ...settings, instantNotifications: e.target.checked })}
                />
                <label htmlFor="instantNotifications" className="ml-2 block text-sm text-gray-700">
                  Receive instant notifications
                </label>
              </div>
            </div>

            <div>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}