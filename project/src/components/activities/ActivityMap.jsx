import { useCallback } from 'react';
import Map from '../maps/Map';
import FallbackMap from './FallbackMap';

export default function ActivityMap({ location }) {
  if (!location?.coordinates) {
    return <FallbackMap location={location} />;
  }

  const markers = [{
    position: location.coordinates,
    title: location.name
  }];

  return (
    <Map
      center={location.coordinates}
      zoom={15}
      markers={markers}
      className="h-96 rounded-lg overflow-hidden"
    />
  );
}