export const validateCoordinates = (coordinates) => {
  if (!coordinates) return false;
  
  const { lat, lng } = coordinates;
  
  if (typeof lat !== 'number' || typeof lng !== 'number') return false;
  if (lat < -90 || lat > 90) return false;
  if (lng < -180 || lng > 180) return false;
  
  return true;
};

export const formatAddress = (location) => {
  if (!location) return '';
  
  const parts = [];
  if (location.name) parts.push(location.name);
  if (location.address) parts.push(location.address);
  
  return parts.join(', ');
};

export const createGoogleMapsUrl = (location) => {
  if (!location) return '';
  
  const query = formatAddress(location);
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};