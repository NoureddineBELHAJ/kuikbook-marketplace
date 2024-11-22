import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

export function GoogleMapsProvider({ children }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Loading maps...</p>
      </div>
    );
  }

  return children;
}