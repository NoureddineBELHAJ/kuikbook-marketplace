import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link to="/" className="btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  );
}