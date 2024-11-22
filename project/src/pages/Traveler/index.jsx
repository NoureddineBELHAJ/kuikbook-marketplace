import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import TravelerHeader from '../../components/Traveler/TravelerHeader';
import TravelerNavigation from '../../components/Traveler/TravelerNavigation';

export default function Traveler() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || user?.role !== 'TRAVELER') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div>
      <TravelerHeader />
      <TravelerNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </div>
    </div>
  );
}