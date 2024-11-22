import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About TravelMarket</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            TravelMarket is your gateway to unique and authentic travel experiences around the world. 
            We connect travelers with local experts and activity providers to create unforgettable memories.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We believe that travel should be more than just visiting places – it should be about 
            creating meaningful connections and experiencing local culture firsthand.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why Choose Us</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>Curated experiences from verified local providers</li>
            <li>Secure booking and payment system</li>
            <li>24/7 customer support</li>
            <li>Best price guarantee</li>
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Join Our Community</h2>
          <div className="bg-primary-50 rounded-lg p-6">
            <p className="text-gray-600 mb-4">
              Whether you're a traveler seeking adventures or a provider offering unique experiences, 
              we'd love to have you as part of our community.
            </p>
            <div className="flex gap-4">
              <Link to="/signup" className="btn-primary">
                Sign Up Now
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}