import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SearchBar from '../components/search/SearchBar';
import FeaturedActivities from '../components/activities/FeaturedActivities';
import PopularCategories from '../components/activities/PopularCategories';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative isolate">
      {/* Hero Section */}
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Discover Amazing Activities Worldwide
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Book unique experiences and activities from local experts around the globe
            </p>
            
            {/* Search Bar */}
            <div className="mt-10">
              <SearchBar className="max-w-2xl mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <PopularCategories />
        </div>
      </div>

      {/* Featured Activities */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FeaturedActivities />
        </div>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Ready to start exploring?
              </h2>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/signup"
                  className="btn-primary bg-[#7C7F86] hover:bg-[#6C6F75]"
                >
                  Sign up now
                </Link>
                <Link
                  to="/activities"
                  className="btn-secondary text-[#7C7F86]"
                >
                  Browse activities
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}