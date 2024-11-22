import { useEffect, useState } from 'react';
import { useAdmin } from '../../hooks/useAdminStore';
import { PlusIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import AddUserModal from '../../components/Admin/AddUserModal';
import UserRoleChip from '../../components/Admin/UserRoleChip';
import UserTypeChip from '../../components/Admin/UserTypeChip';

export default function AdminUsers() {
  const { users, fetchUsers, addUser } = useAdmin();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    role: '',
    userType: '',
    status: ''
  });

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = async (userData) => {
    try {
      await addUser(userData);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please try again.');
    }
  };

  const filteredUsers = users.filter(user => {
    if (filters.role && user.role !== filters.role) return false;
    if (filters.userType && user.userType !== filters.userType) return false;
    if (filters.status && user.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Users</h2>
        <button 
          className="btn-primary inline-flex items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4">
        <select
          className="input"
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="PROVIDER">Provider</option>
          <option value="TRAVELER">Traveler</option>
        </select>

        <select
          className="input"
          value={filters.userType}
          onChange={(e) => setFilters({ ...filters, userType: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="CORPORATE">Corporate</option>
          <option value="INDIVIDUAL">Individual</option>
        </select>

        <select
          className="input"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name/Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.userType === 'CORPORATE' ? user.companyName : `${user.firstName} ${user.lastName}`}
                  </div>
                  {user.userType === 'CORPORATE' && (
                    <div className="text-sm text-gray-500">
                      Contact: {user.contactPerson}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <UserTypeChip userType={user.userType} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <UserRoleChip role={user.role} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  )}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
}