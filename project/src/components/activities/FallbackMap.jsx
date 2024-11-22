import { MapPinIcon } from '@heroicons/react/24/outline';

export default function FallbackMap({ location, error, height = '400px', className = '' }) {
  const googleMapsUrl = location 
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
    : null;

  return (
    <div 
      className={`bg-gray-100 rounded-lg flex flex-col items-center justify-center p-6 text-center ${className}`}
      style={{ height }}
    >
      <MapPinIcon className="h-12 w-12 text-gray-400 mb-4" />
      
      {error ? (
        <>
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Unable to load map
          </h3>
          <p className="text-sm text-gray-500">
            {error}
          </p>
        </>
      ) : location ? (
        <>
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            {location}
          </h3>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-600 hover:text-primary-500"
          >
            View on Google Maps
          </a>
        </>
      ) : (
        <p className="text-sm text-gray-500">
          Location information not available
        </p>
      )}
    </div>
  );
}