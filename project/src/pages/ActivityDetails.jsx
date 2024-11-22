import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ImageGallery from '../components/activities/ImageGallery';
import ActivityMap from '../components/activities/ActivityMap';
import BookingCard from '../components/activities/BookingCard';
import ActivityHeader from '../components/activities/ActivityHeader';
import QuickInfo from '../components/activities/QuickInfo';
import ActivityHighlights from '../components/activities/ActivityHighlights';
import ActivityIncludes from '../components/activities/ActivityIncludes';

export default function ActivityDetails() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data - replace with actual API call
  const activity = {
    id,
    title: 'Desert Safari Adventure',
    description: 'Experience the thrill of dune bashing in the Arabian desert followed by a traditional Bedouin camp dinner. Watch the sunset over the dunes, enjoy camel rides, henna painting, and traditional entertainment.',
    price: 99,
    currency: 'USD',
    duration: 6,
    maxParticipants: 15,
    location: {
      name: 'Dubai Desert Conservation Reserve',
      address: 'Dubai Desert Conservation Reserve, Dubai, UAE',
      coordinates: { 
        lat: 25.1307, 
        lng: 55.3780 
      }
    },
    rating: 4.8,
    reviewCount: 128,
    images: [
      'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800',
      'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800'
    ],
    highlights: [
      'Professional desert safari guide',
      'Dune bashing in 4x4 vehicle',
      'Sunset photography stops',
      'BBQ dinner at Bedouin camp',
      'Cultural activities and entertainment',
      'Hotel pickup and drop-off included'
    ],
    included: [
      'Round-trip transportation',
      'Professional guide',
      'Dinner and beverages',
      'All activities mentioned',
      'Safety equipment'
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <ImageGallery images={activity.images} />
          
          <ActivityHeader
            activity={activity}
            isFavorite={isFavorite}
            onToggleFavorite={() => setIsFavorite(!isFavorite)}
          />
          
          <QuickInfo activity={activity} />

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About this activity</h2>
            <p className="text-gray-600">{activity.description}</p>
          </div>

          <ActivityHighlights highlights={activity.highlights} />
          
          <ActivityIncludes included={activity.included} />

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
            <p className="text-gray-600 mb-4">{activity.location.address}</p>
            <div className="h-96 rounded-lg overflow-hidden">
              <ActivityMap location={activity.location} />
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <BookingCard activity={activity} />
        </div>
      </div>
    </div>
  );
}