import { useState } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { Switch } from '@headlessui/react';

export default function NotificationPreferences() {
  const { preferences, updatePreferences, isLoading } = useNotifications();
  const [formData, setFormData] = useState(preferences);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePreferences(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">
          Notification Preferences
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Choose how you want to receive notifications
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-900">
              Email Notifications
            </label>
            <p className="text-sm text-gray-500">
              Receive notifications via email
            </p>
          </div>
          <Switch
            checked={formData.email}
            onChange={(checked) => setFormData({ ...formData, email: checked })}
            className={`${
              formData.email ? 'bg-primary-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable email notifications</span>
            <span
              className={`${
                formData.email ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-900">
              SMS Notifications
            </label>
            <p className="text-sm text-gray-500">
              Receive notifications via SMS
            </p>
          </div>
          <Switch
            checked={formData.sms}
            onChange={(checked) => setFormData({ ...formData, sms: checked })}
            className={`${
              formData.sms ? 'bg-primary-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable SMS notifications</span>
            <span
              className={`${
                formData.sms ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-900">
              Push Notifications
            </label>
            <p className="text-sm text-gray-500">
              Receive browser push notifications
            </p>
          </div>
          <Switch
            checked={formData.push}
            onChange={(checked) => setFormData({ ...formData, push: checked })}
            className={`${
              formData.push ? 'bg-primary-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable push notifications</span>
            <span
              className={`${
                formData.push ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </form>
  );
}