import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-lg text-gray-600">Page not found</p>
      <Link
        to="/"
        className="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
      >
        Go back home
      </Link>
    </div>
  );
}