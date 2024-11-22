import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const USER_TYPES = {
  CORPORATE: 'CORPORATE',
  INDIVIDUAL: 'INDIVIDUAL'
};

const ROLE_OPTIONS = [
  { id: 'ADMIN', name: 'Administrator' },
  { id: 'PROVIDER', name: 'Activity Provider' },
  { id: 'TRAVELER', name: 'Traveler' }
];

export default function AddUserModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    userType: USER_TYPES.INDIVIDUAL,
    role: 'TRAVELER',
    email: '',
    firstName: '',
    lastName: '',
    companyName: '',
    registrationNumber: '',
    vatNumber: '',
    contactPerson: '',
    phone: '',
    address: '',
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      userType: USER_TYPES.INDIVIDUAL,
      role: 'TRAVELER',
      email: '',
      firstName: '',
      lastName: '',
      companyName: '',
      registrationNumber: '',
      vatNumber: '',
      contactPerson: '',
      phone: '',
      address: '',
      status: 'Active'
    });
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      Add New User
                    </Dialog.Title>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                            User Type
                          </label>
                          <select
                            id="userType"
                            className="input mt-1"
                            value={formData.userType}
                            onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                            required
                          >
                            <option value={USER_TYPES.INDIVIDUAL}>Individual</option>
                            <option value={USER_TYPES.CORPORATE}>Corporate</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                          </label>
                          <select
                            id="role"
                            className="input mt-1"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            required
                          >
                            {ROLE_OPTIONS.map(role => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {formData.userType === USER_TYPES.INDIVIDUAL ? (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                              First Name
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              className="input mt-1"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              required
                            />
                          </div>

                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              className="input mt-1"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
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

                          <div>
                            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
                              Contact Person
                            </label>
                            <input
                              type="text"
                              id="contactPerson"
                              className="input mt-1"
                              value={formData.contactPerson}
                              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address
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
                          Phone Number
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

                      <div>
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
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          id="status"
                          className="input mt-1"
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          required
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="btn-primary w-full sm:ml-3 sm:w-auto"
                        >
                          Add User
                        </button>
                        <button
                          type="button"
                          className="btn-secondary mt-3 w-full sm:mt-0 sm:w-auto"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}