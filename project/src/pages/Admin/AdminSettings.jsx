import { useState } from 'react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'TravelMarket',
    contactEmail: 'support@travelmarket.com',
    bookingFee: '10',
    currency: 'USD',
    requireApproval: true,
    autoPublishReviews: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle settings update
  };

  return (
    <div className="space-y-6 animate-enter">
      <div className="card">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                  Site Name
                </label>
                <input
                  type="text"
                  id="siteName"
                  className="input mt-1"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
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
                />
              </div>

              <div>
                <label htmlFor="bookingFee" className="block text-sm font-medium text-gray-700">
                  Booking Fee (%)
                </label>
                <input
                  type="number"
                  id="bookingFee"
                  className="input mt-1"
                  value={settings.bookingFee}
                  onChange={(e) => setSettings({ ...settings, bookingFee: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <select
                  id="currency"
                  className="input mt-1"
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="requireApproval"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={settings.requireApproval}
                  onChange={(e) => setSettings({ ...settings, requireApproval: e.target.checked })}
                />
                <label htmlFor="requireApproval" className="ml-2 block text-sm text-gray-700">
                  Require approval for new activities
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoPublishReviews"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={settings.autoPublishReviews}
                  onChange={(e) => setSettings({ ...settings, autoPublishReviews: e.target.checked })}
                />
                <label htmlFor="autoPublishReviews" className="ml-2 block text-sm text-gray-700">
                  Auto-publish reviews
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