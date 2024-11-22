import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function TravelerSettings() {
  const { user, updateProfile } = useAuth();
  const [settings, setSettings] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    preferredCurrency: user?.preferredCurrency || 'USD',
    language: user?.language || 'English',
    notifications: {
      bookingConfirmations: true,
      tripReminders: true,
      specialOffers: false,
      newsletter: true,
      ...user?.notifications
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');

    try {
      await updateProfile({
        ...user,
        ...settings,
        updatedAt: new Date().toISOString()
      });

      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-enter">
      <div className="card">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input mt-1"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input mt-1"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
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
                />
              </div>

              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                  Preferred Currency
                </label>
                <select
                  id="currency"
                  className="input mt-1"
                  value={settings.preferredCurrency}
                  onChange={(e) => setSettings({ ...settings, preferredCurrency: e.target.value })}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select
                  id="language"
                  className="input mt-1"
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-md font-medium text-gray-900">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="bookingConfirmations"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={settings.notifications.bookingConfirmations}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        bookingConfirmations: e.target.checked
                      }
                    })}
                  />
                  <label htmlFor="bookingConfirmations" className="ml-2 block text-sm text-gray-700">
                    Booking confirmations
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tripReminders"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={settings.notifications.tripReminders}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        tripReminders: e.target.checked
                      }
                    })}
                  />
                  <label htmlFor="tripReminders" className="ml-2 block text-sm text-gray-700">
                    Trip reminders
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="specialOffers"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={settings.notifications.specialOffers}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        specialOffers: e.target.checked
                      }
                    })}
                  />
                  <label htmlFor="specialOffers" className="ml-2 block text-sm text-gray-700">
                    Special offers
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={settings.notifications.newsletter}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        newsletter: e.target.checked
                      }
                    })}
                  />
                  <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                    Newsletter
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              {saveMessage && (
                <p className={`text-sm ${saveMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                  {saveMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}