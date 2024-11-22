import { Link } from 'react-router-dom';

export default function Help() {
  const helpTopics = [
    {
      title: 'Getting Started',
      items: [
        { title: 'How to Book an Activity', href: '#booking' },
        { title: 'Creating an Account', href: '#account' },
        { title: 'Payment Methods', href: '#payment' }
      ]
    },
    {
      title: 'Bookings & Cancellations',
      items: [
        { title: 'Cancellation Policy', href: '#cancellation' },
        { title: 'Modifying a Booking', href: '#modify' },
        { title: 'Refund Process', href: '#refund' }
      ]
    },
    {
      title: 'For Activity Providers',
      items: [
        { title: 'Becoming a Provider', href: '#provider' },
        { title: 'Managing Activities', href: '#activities' },
        { title: 'Handling Bookings', href: '#manage-bookings' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Help Center</h1>
        
        <div className="space-y-12">
          {helpTopics.map((section) => (
            <div key={section.title} className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.href} id={item.href.slice(1)} className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">
                      Detailed information about {item.title.toLowerCase()} will be displayed here.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Still have questions?{' '}
            <Link to="/contact" className="text-primary-600 hover:text-primary-500">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}