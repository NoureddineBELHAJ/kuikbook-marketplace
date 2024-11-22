import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ProviderHeader from '../../components/Provider/ProviderHeader';
import ProviderNavigation from '../../components/Provider/ProviderNavigation';
import { motion } from 'framer-motion';

export default function Provider() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Strict role check for provider access
  if (!isAuthenticated || user?.currentRole !== 'PROVIDER') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProviderHeader />
      <ProviderNavigation />
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}