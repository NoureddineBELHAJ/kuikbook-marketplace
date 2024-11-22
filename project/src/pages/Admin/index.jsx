import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminNavigation from '../../components/Admin/AdminNavigation';
import { Transition } from '@headlessui/react';

export default function Admin() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Strict role check for admin access
  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <AdminNavigation />
      
      <Transition
        show={true}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </Transition>
    </div>
  );
}