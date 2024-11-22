import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useBookings } from '../../hooks/useBookings';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import StatCard from '../../components/common/StatCard';
import BookingCard from '../../components/common/BookingCard';

export default function TravelerDashboard() {
  const { user } = useAuth();
  const { getTravelerBookings } = useBookings();
  const [stats, setStats] = useState({
    upcomingTrips: 0,
    placesVisited: 0,
    reviewsGiven: 0,
    savedPlaces: 0
  });
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const bookingsData = await getTravelerBookings(user.id);
        
        if (Array.isArray(bookingsData)) {
          setBookings(bookingsData);
          
          // Calculate stats
          const activeBookings = bookingsData.filter(b => b.status === 'Active');
          const uniquePlaces = new Set(bookingsData.map(b => b.location)).size;
          
          setStats({
            upcomingTrips: activeBookings.length,
            placesVisited: uniquePlaces,
            reviewsGiven: 8, // This should come from reviews API
            savedPlaces: 15 // This should come from saved places API
          });
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.id, getTravelerBookings]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const activeBookings = bookings.filter(b => b.status === 'Active');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Upcoming Trips"
            value={stats.upcomingTrips}
            icon="calendar"
          />
          <StatCard
            title="Places Visited"
            value={stats.placesVisited}
            icon="location"
          />
          <StatCard
            title="Reviews Given"
            value={stats.reviewsGiven}
            icon="star"
          />
          <StatCard
            title="Saved Places"
            value={stats.savedPlaces}
            icon="heart"
          />
        </div>

        {/* Upcoming Trips */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Trips</h2>
            <Link
              to="/traveler/bookings"
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {activeBookings.length > 0 ? (
              activeBookings.slice(0, 3).map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No upcoming trips</p>
                <Link 
                  to="/activities" 
                  className="mt-4 inline-block text-primary-600 hover:text-primary-500"
                >
                  Browse Activities
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}