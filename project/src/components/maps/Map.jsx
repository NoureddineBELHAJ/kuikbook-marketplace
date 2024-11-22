import { useCallback, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { validateCoordinates } from '../../utils/mapUtils';
import FallbackMap from '../activities/FallbackMap';

const defaultCenter = {
  lat: 31.7917,
  lng: -7.0926
};

const defaultOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  clickableIcons: false,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

export default function Map({
  center = defaultCenter,
  zoom = 6,
  height = '400px',
  markers = [],
  onClick,
  onLoad: onLoadProp,
  className = ''
}) {
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);

  if (typeof window === 'undefined' || !window.google?.maps) {
    return (
      <FallbackMap 
        className={className} 
        height={height}
        location={markers[0]?.title}
      />
    );
  }

  const handleLoad = useCallback((map) => {
    try {
      setMap(map);
      if (onLoadProp) onLoadProp(map);

      if (markers.length > 1) {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(marker => {
          bounds.extend(marker.position);
        });
        map.fitBounds(bounds);
      }
    } catch (error) {
      setError(error.message);
      console.error('Map load error:', error);
    }
  }, [onLoadProp, markers]);

  const handleClick = useCallback((e) => {
    if (!onClick) return;

    try {
      const coordinates = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };

      if (validateCoordinates(coordinates)) {
        onClick(coordinates);
      }
    } catch (error) {
      console.error('Map click error:', error);
    }
  }, [onClick]);

  if (error) {
    return (
      <FallbackMap 
        className={className} 
        height={height}
        error={error}
        location={markers[0]?.title}
      />
    );
  }

  return (
    <div className={className} style={{ height }}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={zoom}
        options={{
          ...defaultOptions,
          restriction: {
            latLngBounds: {
              north: 85,
              south: -85,
              west: -180,
              east: 180
            }
          }
        }}
        onLoad={handleLoad}
        onClick={handleClick}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            title={marker.title}
            animation={window.google.maps.Animation.DROP}
          />
        ))}
      </GoogleMap>
    </div>
  );
}