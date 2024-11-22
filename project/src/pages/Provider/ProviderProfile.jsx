import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useActivities } from '../../hooks/useActivities';
import { 
  BuildingOfficeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  IdentificationIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function ProviderProfile() {
  const { user, updateProfile } = useAuth();
  const { getProviderActivities } = useActivities();
  const activities = getProviderActivities(user?.id);

  const [formData, setFormData] = useState({
    companyName: user?.companyName || '',
    description: user?.description || '',
    website: user?.website || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    registrationNumber: user?.registrationNumber || '',
    vatNumber: user?.vatNumber || ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({
      ...user,
      ...formData
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-enter">
      {/* Business Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Business Profile</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-secondary"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  className="input mt-1"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  className="input mt-1"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="input mt-1"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="input mt-1"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
                  Registration Number
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  className="input mt-1"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700">
                  VAT Number
                </label>
                <input
                  type="text"
                  id="vatNumber"
                  className="input mt-1"
                  value={formData.vatNumber}
                  onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Business Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="input mt-1"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-center">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Company Name</p>
                  <p className="text-sm text-gray-900">{formData.companyName}</p>
                </div>
              </div>

              <div className="flex items-center">
                <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Website</p>
                  <p className="text-sm text-gray-900">{formData.website || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{formData.email}</p>
                </div>
              </div>

              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-sm text-gray-900">{formData.phone}</p>
                </div>
              </div>

              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-sm text-gray-900">{formData.address}</p>
                </div>
              </div>

              <div className="flex items-center">
                <IdentificationIcon className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Registration Details</p>
                  <p className="text-sm text-gray-900">
                    Reg: {formData.registrationNumber}
                    {formData.vatNumber && ` | VAT: ${formData.vatNumber}`}
                  </p>
                </div>
              </div>
            </div>

            {formData.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Business Description</h3>
                <p className="mt-1 text-sm text-gray-900">{formData.description}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Business Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Activities</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{activities.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Since</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Verification Status</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">Verified</p>
        </div>
      </div>
    </div>
  );
}